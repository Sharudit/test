import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment, BundleResource, Patient } from '../models/model';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getAppointments(): Observable<BundleResource<Appointment>> {
    return this.http.get<BundleResource<Appointment>>('https://spark.incendi.no/fhir/Appointment');
  }

  getPatient(patientId: string): Observable<Patient> {
    return this.http.get<Patient>(`https://spark.incendi.no/fhir/Patient/${patientId}`);
  }
}
