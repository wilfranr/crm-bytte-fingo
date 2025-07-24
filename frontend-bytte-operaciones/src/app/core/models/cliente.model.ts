export interface Cliente {
    _id?: string; // Añadir _id para el ID de MongoDB
    active: boolean;
    address: string;
    custom_fields: {
        direccion: string | null;
        fecha_de_expedicion: string | null;
        id_formulario: string;
        numero_de_identificacion: number | null;
        nit: number | null;
    };
    description: string | null;
    email: string;
    other_emails: string[];
    id: number;
    job_title: string | null;
    language: string;
    mobile: string;
    direccion?: string;
    ciudad?: string;
    pais?: string;
    departamento?: string;
    name: string;
    phone: string | null;
    time_zone: string;
    twitter_id: string | null;
    facebook_id: string | null;
    external_id: string | null;
    created_at: string;
    updated_at: string;
    company_id: number;
    unique_external_id: string;
    company: {
        id: number;
        view_all_tickets: boolean;
        name: string;
        avatar: any | null;
    };
    companyName?: string; // Nueva propiedad para el nombre de la empresa
    other_companies: any[];
    tarjetasCount?: number; // Nueva propiedad para el conteo de tarjetas
}