import { Component, OnDestroy, OnInit } from '@angular/core';
import { from, of, Subject } from 'rxjs';
import { distinct, filter, map, mergeMap, switchMap, takeUntil } from 'rxjs/operators';
import { Appointment, Patient } from 'src/app/models/model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<boolean>();

  patients: Patient[] = [];
  patientsAppointments: { [key: string]: Appointment[] } = {};

  appointments: Appointment[] = [];

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    const appointments$ = this.dataService.getAppointments()
      .pipe(takeUntil(this.destroy$))
      .pipe(map((bundleAppointments) => {
        return bundleAppointments.entry.map((appointmentEntry) => appointmentEntry.resource);
      }));

    appointments$.pipe(switchMap((appointments) => {
      this.appointments = appointments;
      return from(appointments);
    }),
      switchMap((appointment) => {
        return from(appointment.participant);
      }),
      map(participantElement => {
        const patientId = participantElement.actor?.reference?.match(/Patient\/(.*)/)?.[1];
        if (patientId) {
          this.patientsAppointments[patientId] = this.appointments.filter((appointment) => {
            return appointment.participant.some((item) => {
              return patientId === item.actor?.reference?.match(/Patient\/(.*)/)?.[1];
            });
          });
        }
        return patientId;
      }),
      filter((patientId) => !!patientId && !this.patients.some(patient => patient.id === patientId)),
      distinct(),
      mergeMap((patientId) => {
        if (patientId) {
          return this.dataService.getPatient(patientId);
        } else {
          return of(null);
        }
      }),
    )
      .pipe(takeUntil(this.destroy$))
      .subscribe((patient) => {
        if (patient) {
          this.patients.push(patient);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
