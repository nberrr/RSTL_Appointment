-- RSTL Appointment Portal Database Setup Script
-- This script creates the database and all required tables

-- Create database
CREATE DATABASE rstl_appointment_portal;

-- Connect to the database 
\c rstl_appointment_portal

-- Enable the UUID extension for generating unique IDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    lab_access VARCHAR(255),
    role VARCHAR(50) NOT NULL DEFAULT 'staff',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Customers table
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    contact_number VARCHAR(50),
    sex VARCHAR(10),
    company_name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Companies table (primarily for metrology)
CREATE TABLE companies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    contact_person VARCHAR(100),
    contact_email VARCHAR(100),
    contact_phone VARCHAR(50),
    business_permit BYTEA,
    oror_document BYTEA,
    reg_date DATE,
    verified BOOLEAN DEFAULT FALSE,
    verified_date DATE,
    license_plates VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Trucks table (for metrology)
CREATE TABLE trucks (
    id SERIAL PRIMARY KEY,
    license_plate VARCHAR(50) NOT NULL UNIQUE,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Services table
CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL,
    description TEXT,
    price DECIMAL(10,2),
    duration_minutes INTEGER,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create AppointmentConstraints table (primarily for metrology)
CREATE TABLE appointment_constraints (
    id SERIAL PRIMARY KEY,
    constraint_date DATE NOT NULL,
    daily_liter_capacity DECIMAL(10,2) NOT NULL,
    max_appointments_per_day INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create AdminAssignments table
CREATE TABLE admin_assignments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    laboratory VARCHAR(100) NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Appointments table
CREATE TABLE appointments (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customers(id) ON DELETE CASCADE,
    service_id INTEGER REFERENCES services(id) ON DELETE RESTRICT,
    company_id INTEGER REFERENCES companies(id) ON DELETE SET NULL,
    truck_id INTEGER REFERENCES trucks(id) ON DELETE SET NULL,
    appointment_date DATE NOT NULL,
    appointment_time TIME,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create InquiryInformation table
CREATE TABLE inquiry_information (
    id SERIAL PRIMARY KEY,
    appointment_id INTEGER REFERENCES appointments(id) ON DELETE CASCADE,
    mode_of_inquiry VARCHAR(50),
    rstl_personnel_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    response_deadline DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create AppointmentDetails table
CREATE TABLE appointment_details (
    id SERIAL PRIMARY KEY,
    appointment_id INTEGER REFERENCES appointments(id) ON DELETE CASCADE,
    plate_number VARCHAR(50),
    sample_description TEXT,
    name_of_samples VARCHAR(255),
    sample_type VARCHAR(100),
    sample_condition VARCHAR(100),
    sample_quantity INTEGER,
    number_of_replicates INTEGER,
    terms_accepted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create MetrologyDetails table
CREATE TABLE metrology_details (
    id SERIAL PRIMARY KEY,
    appointment_detail_id INTEGER REFERENCES appointment_details(id) ON DELETE CASCADE,
    type_of_test VARCHAR(100) NOT NULL,
    number_of_liters INTEGER,
    instrument_type VARCHAR(100),
    truck_plate_number VARCHAR(50),
    manager_name VARCHAR(255),
    manager_contact VARCHAR(100),
    manager_approval_date DATE,
    liquid_carried_liters DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create ChemistryDetails table
CREATE TABLE chemistry_details (
    id SERIAL PRIMARY KEY,
    appointment_detail_id INTEGER REFERENCES appointment_details(id) ON DELETE CASCADE,
    analysis_requested TEXT,
    parameters TEXT,
    delivery_type VARCHAR(100),
    sample_quantity INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create MicrobiologyDetails table
CREATE TABLE microbiology_details (
    id SERIAL PRIMARY KEY,
    appointment_detail_id INTEGER REFERENCES appointment_details(id) ON DELETE CASCADE,
    test_type VARCHAR(100),
    organism_target VARCHAR(100),
    sample_storage_condition VARCHAR(100),
    sample_quantity INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create ShelfLifeDetails table
CREATE TABLE shelf_life_details (
    id SERIAL PRIMARY KEY,
    appointment_detail_id INTEGER REFERENCES appointment_details(id) ON DELETE CASCADE,
    product_type VARCHAR(100),
    storage_conditions TEXT,
    shelf_life_duration INTEGER,
    packaging_type VARCHAR(100),
    modes_of_deterioration TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create ResearchConsultationDetails table
CREATE TABLE research_consultation_details (
    id SERIAL PRIMARY KEY,
    appointment_detail_id INTEGER REFERENCES appointment_details(id) ON DELETE CASCADE,
    research_topic TEXT,
    consultation_type VARCHAR(100),
    research_stage VARCHAR(100),
    additional_requirements TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create TestResults table
CREATE TABLE test_results (
    id SERIAL PRIMARY KEY,
    appointment_id INTEGER REFERENCES appointments(id) ON DELETE CASCADE,
    result_data JSONB,
    result_file_path VARCHAR(255),
    conducted_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create ActionLogs table
CREATE TABLE action_logs (
    id SERIAL PRIMARY KEY,
    appointment_id INTEGER REFERENCES appointments(id) ON DELETE CASCADE,
    action_type VARCHAR(50),
    action_desc TEXT,
    performed_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Remarks table
CREATE TABLE remarks (
    id SERIAL PRIMARY KEY,
    appointment_id INTEGER REFERENCES appointments(id) ON DELETE CASCADE,
    remark_text TEXT,
    remark_type VARCHAR(50),
    created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create LabAssignments table
CREATE TABLE lab_assignments (
    id SERIAL PRIMARY KEY,
    appointment_id INTEGER REFERENCES appointments(id) ON DELETE CASCADE,
    laboratory_id INTEGER REFERENCES services(id) ON DELETE RESTRICT,
    assigned_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    assigned_to INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for frequently queried fields
CREATE INDEX idx_appointments_customer_id ON appointments(customer_id);
CREATE INDEX idx_appointments_service_id ON appointments(service_id);
CREATE INDEX idx_appointments_date ON appointments(appointment_date);
CREATE INDEX idx_appointments_status ON appointments(status);
CREATE INDEX idx_appointments_company_id ON appointments(company_id);
CREATE INDEX idx_appointments_truck_id ON appointments(truck_id);
CREATE INDEX idx_trucks_company_id ON trucks(company_id);
CREATE INDEX idx_admin_assignments_user_id ON admin_assignments(user_id);
CREATE INDEX idx_inquiry_information_appointment_id ON inquiry_information(appointment_id);
CREATE INDEX idx_appointment_details_appointment_id ON appointment_details(appointment_id);
CREATE INDEX idx_test_results_appointment_id ON test_results(appointment_id);
CREATE INDEX idx_action_logs_appointment_id ON action_logs(appointment_id);
CREATE INDEX idx_remarks_appointment_id ON remarks(appointment_id);
CREATE INDEX idx_lab_assignments_appointment_id ON lab_assignments(appointment_id);

-- Create comprehensive report view
CREATE VIEW appointment_report_view AS
SELECT 
    a.id AS inquiry_id,
    a.created_at AS date_of_inquiry,
    i.mode_of_inquiry,
    u_personnel.name AS rstl_personnel,
    s.name AS type_of_inquiry,
    c.name AS customer_name,
    c.company_name,
    c.email,
    c.contact_number,
    a.appointment_date,
    ad.sample_description,
    ad.name_of_samples,
    ad.sample_quantity,
    ad.number_of_replicates,
    s.category AS laboratory,
    (SELECT action_desc FROM action_logs WHERE appointment_id = a.id AND action_type = 'lab' ORDER BY created_at DESC LIMIT 1) AS action_from_lab,
    a.appointment_date AS schedule,
    (SELECT remark_text FROM remarks WHERE appointment_id = a.id ORDER BY created_at DESC LIMIT 1) AS remarks,
    (SELECT action_desc FROM action_logs WHERE appointment_id = a.id AND action_type = 'cro' ORDER BY created_at DESC LIMIT 1) AS action_from_cro,
    i.response_deadline AS wait_response_until,
    a.status,
    (SELECT string_agg(action_desc, ', ') FROM action_logs WHERE appointment_id = a.id ORDER BY created_at DESC) AS action_logs,
    -- Metrology specific fields
    CASE WHEN s.category = 'metrology' THEN 
        (SELECT t.license_plate FROM trucks t WHERE t.id = a.truck_id) 
    ELSE NULL END AS truck_plate,
    CASE WHEN s.category = 'metrology' THEN 
        (SELECT m.liquid_carried_liters FROM metrology_details m JOIN appointment_details ad ON m.appointment_detail_id = ad.id WHERE ad.appointment_id = a.id)
    ELSE NULL END AS liquid_carried_liters,
    CASE WHEN s.category = 'metrology' THEN 
        (SELECT comp.name FROM companies comp WHERE comp.id = a.company_id)
    ELSE NULL END AS company_name
FROM 
    appointments a
JOIN 
    customers c ON a.customer_id = c.id
JOIN 
    services s ON a.service_id = s.id
LEFT JOIN 
    appointment_details ad ON a.id = ad.appointment_id
LEFT JOIN 
    inquiry_information i ON a.id = i.appointment_id
LEFT JOIN 
    users u_personnel ON i.rstl_personnel_id = u_personnel.id;

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_modified_column() 
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW; 
END;
$$ language 'plpgsql';

-- Create triggers to automatically update the updated_at column
CREATE TRIGGER update_users_modtime BEFORE UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_customers_modtime BEFORE UPDATE ON customers FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_companies_modtime BEFORE UPDATE ON companies FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_trucks_modtime BEFORE UPDATE ON trucks FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_services_modtime BEFORE UPDATE ON services FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_appointment_constraints_modtime BEFORE UPDATE ON appointment_constraints FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_admin_assignments_modtime BEFORE UPDATE ON admin_assignments FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_appointments_modtime BEFORE UPDATE ON appointments FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_inquiry_information_modtime BEFORE UPDATE ON inquiry_information FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_appointment_details_modtime BEFORE UPDATE ON appointment_details FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_metrology_details_modtime BEFORE UPDATE ON metrology_details FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_chemistry_details_modtime BEFORE UPDATE ON chemistry_details FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_microbiology_details_modtime BEFORE UPDATE ON microbiology_details FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_shelf_life_details_modtime BEFORE UPDATE ON shelf_life_details FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_research_consultation_details_modtime BEFORE UPDATE ON research_consultation_details FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_test_results_modtime BEFORE UPDATE ON test_results FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_lab_assignments_modtime BEFORE UPDATE ON lab_assignments FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

-- Add a default admin user
INSERT INTO users (name, email, password, role, lab_access)
VALUES ('Administrator', 'admin@rstl.gov', '$2a$10$JERhJYGmwNB6aVdpoXWEfO3h2Le3d0xNn4AkKtrkQpk6LuZuaHX9m', 'admin', 'all');
-- Note: The password here is hashed. The original password is 'admin123'

-- Create some initial services
INSERT INTO services (name, category, description, price, duration_minutes)
VALUES 
('Flow Meter Calibration', 'metrology', 'Calibration of flow meters for accurate measurement', 2500.00, 120),
('Water Analysis', 'chemistry', 'Complete analysis of water samples for potability and contamination', 1800.00, 180),
('Bacterial Testing', 'microbiology', 'Testing for bacterial contamination in food samples', 2000.00, 240),
('Shelf Life Study', 'shelf_life', 'Comprehensive shelf life determination for food products', 5000.00, 480),
('Research Consultation', 'research', 'Consultation on research methodologies and experimental design', 1500.00, 120);

COMMIT;
