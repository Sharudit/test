export interface HumanName {
    use: any;
    text: string;
    family: string;
    given: string;
    prefix: string;
    suffix: string;
    period: string;
}

export interface Patient {
    id: string;
    name: HumanName[];
    gender: string;
    birthDate: Date;
}

export interface PatientView extends Patient {
    appoinmentsCount: number;
}

export interface Actor {
    reference: string;
    type: any;
    identifier: any;
    display: any;
}

export interface Participant {
    type: any;
    actor: Actor;
    required: any;
    status: any;
    period: any;
}

export interface Appointment {
    participant: Participant[];
    identifier: any;
    status: any;
    cancelationReason: any;
    serviceCategory: any;
    serviceType: any;
    specialty: any;
    appointmentType: any;
    reasonCode: any;
    reasonReference: any;
    priority: any;
    description: string;
    supportingInformation: any;
    start: Date;
    end: any;
    minutesDuration: any;
    slot: any;
    created: any;
    comment: any;
    patientInstruction: any;
    basedOn: any;
    requestedPeriod: any;
}

export interface BundleResource<T> {
    entry: BundleEntry<T>[];
    id: any;
    link: any;
    resourceType: any;
    total: any;
    type: any;
}

export interface BundleEntry<T> {
    fullUrl: any;
    resource: T;
}

