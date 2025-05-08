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
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    sample_type VARCHAR(100)
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
    sample_quantity VARCHAR(100),
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
    sample_quantity VARCHAR(100),
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
    sample_quantity VARCHAR(100),
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
    uploaded_research_paper VARCHAR(255),
    consultation_details TEXT,
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

-- Insert CHEMICAL TESTS
INSERT INTO services (name, category, sample_type, price, duration_minutes) VALUES
-- FOOD
('Alcohol by volume of distilled liquor', 'chemistry', 'Food', 390.00, 60),
('Alcohol by volume of distilled liquor', 'chemistry', 'Food', 390.00, 60),
('Ash', 'chemistry', 'Food', 650.00, 60),
('Boil Reducing', 'chemistry', 'Food', 570.00, 60),
('Color', 'chemistry', 'Food', 650.00, 60),
('Crude Fiber', 'chemistry', 'Food', 1_080.00, 60),
('Dietary Fiber', 'chemistry', 'Food', 1_800.00, 60),
('Energy in kcal of oils and fats as olec/lauric', 'chemistry', 'Food', 1_200.00, 60),
('Free Fatty Acid (oil)', 'chemistry', 'Food', 1_500.00, 60),
('Free Fatty Acid with sample preparation', 'chemistry', 'Food', 1_500.00, 60),
('Minerals in Food per analysis', 'chemistry', 'Food', 1_500.00, 60),
('Sodium (Na), Calcium (Ca), Iron (Fe), Potassium (K), Magnesium (Mg), Manganese (Mn), Zinc (Zn)', 'chemistry', 'Food', 1_500.00, 60),
('Moisture', 'chemistry', 'Food', 500.00, 60),
('Nitrate', 'chemistry', 'Food', 800.00, 60),
('Nitrites', 'chemistry', 'Food', 800.00, 60),
('Nutrition Facts Computation and Drafting (Daily Value)', 'chemistry', 'Food', 1_500.00, 60),
('Nutrition Facts Computation and Drafting (REIN)', 'chemistry', 'Food', 1_500.00, 60),
('Permanganate Oxidation No.', 'chemistry', 'Food', 1_200.00, 60),
('Peroxide Value of oils and fats', 'chemistry', 'Food', 650.00, 60),
('Peroxide Value of food with sample preparation', 'chemistry', 'Food', 1_200.00, 60),
('Protein', 'chemistry', 'Food', 1_525.00, 60),
('Refractive Index', 'chemistry', 'Food', 1_000.00, 60),
('Salt as NaCl', 'chemistry', 'Food', 800.00, 60),
('Saponification Value of oils', 'chemistry', 'Food', 1_200.00, 60),
('Titratable acidity of vinegars as acetic acid', 'chemistry', 'Food', 1_000.00, 60),
('Total Carbohydrates by computation', 'chemistry', 'Food', 1_200.00, 60),
('Total Fat', 'chemistry', 'Food', 1_200.00, 60),
('Total Soluble Solids', 'chemistry', 'Food', 1_000.00, 60),
('Trace Metals (Cd, Cu, Pb, Ni)', 'chemistry', 'Food', 1_200.00, 60),
('Water Activity', 'chemistry', 'Food', 1_200.00, 60),
-- WATER AND WASTEWATER
('Alkalinity', 'chemistry', 'Water and Wastewater', 1_500.00, 60),
('Biochemical Oxygen Demand', 'chemistry', 'Water and Wastewater', 1_500.00, 60),
('Calcium (Ca), Hardness', 'chemistry', 'Water and Wastewater', 1_200.00, 60),
('Color', 'chemistry', 'Water and Wastewater', 750.00, 60),
('Chloride', 'chemistry', 'Water and Wastewater', 800.00, 60),
('Conductivity', 'chemistry', 'Water and Wastewater', 750.00, 60),
('Dissolved Oxygen', 'chemistry', 'Water and Wastewater', 900.00, 60),
('Magnesium (Mg) by computation', 'chemistry', 'Water and Wastewater', 1_200.00, 60),
('Nitrates', 'chemistry', 'Water and Wastewater', 800.00, 60),
('Oil and Grease', 'chemistry', 'Water and Wastewater', 1_800.00, 60),
('pH', 'chemistry', 'Water and Wastewater', 500.00, 60),
('Residual Chlorine', 'chemistry', 'Water and Wastewater', 1_000.00, 60),
('Salinity', 'chemistry', 'Water and Wastewater', 800.00, 60),
('Sulfate', 'chemistry', 'Water and Wastewater', 1_200.00, 60),
('Total Dissolved Solids', 'chemistry', 'Water and Wastewater', 1_200.00, 60),
('Total Hardness', 'chemistry', 'Water and Wastewater', 1_200.00, 60),
('Total Suspended Solids', 'chemistry', 'Water and Wastewater', 1_200.00, 60),
('Turbidity', 'chemistry', 'Water and Wastewater', 1_200.00, 60),
('Trace Metals (Cd, Ca, Cu, Fe, Pb, Mg, Mn, Ni, K, Na, Zn)', 'chemistry', 'Water and Wastewater', 1_200.00, 60),
-- PLANT AND PLANT EXTRACTS
('Distillation using rotary evaporator (per 50mL)', 'chemistry', 'Plant and Plant Extracts', 1_500.00, 60),
('Qualitative Phytochemical Analysis', 'chemistry', 'Plant and Plant Extracts', 1_500.00, 60),
-- PACKAGES
('Nutrition Facts Analysis', 'chemistry', 'Packages', 14_610.00, 60),
('Physical & Chemical Quality for Drinking Water', 'chemistry', 'Packages', 16_000.00, 60);

-- Insert MICROBIOLOGICAL TESTS
INSERT INTO services (name, category, sample_type, price, duration_minutes) VALUES
-- FOOD
('Aerobic Plate Count (Conventional)', 'microbiology', 'Food', 650.00, 60),
('Aerobic Plate Count (Petrifilm)', 'microbiology', 'Food', 650.00, 60),
('Coliform Count (Petrifilm)', 'microbiology', 'Food', 650.00, 60),
('Commercial Sterility Test (low acid only)', 'microbiology', 'Food', 1_000.00, 60),
('Escherichia coli Count', 'microbiology', 'Food', 1_000.00, 60),
('Salmonella Detection', 'microbiology', 'Food', 1_500.00, 60),
('Staphylococcus aureus Count (Petrifilm)', 'microbiology', 'Food', 1_000.00, 60),
('Yeast and Mold Count (Conventional)', 'microbiology', 'Food', 1_000.00, 60),
('Rapid Yeast and Mold Count (Petrifilm)', 'microbiology', 'Food', 1_000.00, 60),
-- WATER AND WASTEWATER
('Heterotrophic Plate Count', 'microbiology', 'Water and Wastewater', 650.00, 60),
('MPN of Total Coliform', 'microbiology', 'Water and Wastewater', 1_000.00, 60),
('MPN of Total Coliform - confirmed test for Thermotolerant (Fecal Coliform)', 'microbiology', 'Water and Wastewater', 1_000.00, 60),
('MPN of Total Coliform - confirmed test for E. coli', 'microbiology', 'Water and Wastewater', 1_000.00, 60),
-- PLANT EXTRACTS
('Antimicrobial activity against E. coli', 'microbiology', 'Plant Extracts', 600.00, 60),
('Antimicrobial activity against S. aureus', 'microbiology', 'Plant Extracts', 600.00, 60),
-- OTHERS
('Surface Swab', 'microbiology', 'Others', 550.00, 60),
-- PACKAGES
('PACKAGE A: Heterotrophic Plate Count + Coliform Count', 'microbiology', 'Packages', 1_700.00, 60),
('PACKAGE B: Heterotrophic Plate Count + Coliform Count + Fecal Coliform Count + E. coli Count', 'microbiology', 'Packages', 2_000.00, 60),
('PACKAGE C: Heterotrophic Plate Count + Coliform Count + Fecal Coliform Count', 'microbiology', 'Packages', 1_200.00, 60),
('PACKAGE D: Coliform Count + E. coli Count (Colilert-18)', 'microbiology', 'Packages', 1_200.00, 60),
('PACKAGE E: Heterotrophic Plate Count + Coliform Count + E. coli Count (Colilert-18)', 'microbiology', 'Packages', 1_200.00, 60),
('PACKAGE F: Coliform Count + E. coli Count (Colilert-18)', 'microbiology', 'Packages', 1_200.00, 60);

-- Insert RESEARCH CONSULTATION
INSERT INTO services (name, category, description, price, duration_minutes, active, sample_type)
VALUES ('Research Consultation', 'research', 'Consultation on research methodologies and experimental design', 1500.00, 120, true, 'N/A');

-- Insert METROLOGY TESTS
INSERT INTO services (name, category, sample_type, price, duration_minutes) VALUES
('Flow Meter Calibration', 'metrology', 'Liquid', 2500.00, 120),
('Volume Verification', 'metrology', 'Liquid', 1800.00, 90),
('Truck Tank Calibration', 'metrology', 'Liquid', 3000.00, 180);

-- Insert SHELF LIFE TESTS
INSERT INTO services (name, category, sample_type, price, duration_minutes) VALUES
('Shelf Life Test (Food & Beverage)', 'shelf-life', 'Food', 2500.00, 60),
('Shelf Life Test (Cosmetics & Personal Care)', 'shelf-life', 'Cosmetics', 3000.00, 60),
('Shelf Life Test (Pharmaceuticals)', 'shelf-life', 'Pharmaceuticals', 5000.00, 60),
('Shelf Life Test (Packaging Materials)', 'shelf-life', 'Packaging', 1500.00, 60);

-- DUMMY CUSTOMERS
-- Note: sex is VARCHAR(10), so use 'Male' or 'Female' only
INSERT INTO customers (name, email, contact_number, sex, company_name) VALUES
('Alice Chem', 'alice.chem@example.com', '09170000001', 'Female', 'ChemCorp'),
('Bob Bio', 'bob.bio@example.com', '09170000002', 'Male', 'BioInc'),
('Charlie Metro', 'charlie.metro@example.com', '09170000003', 'Male', 'MetroTrucks'),
('Diana Shelf', 'diana.shelf@example.com', '09170000004', 'Female', 'ShelfFoods'),
('Eve Chem', 'eve.chem@example.com', '09170000005', 'Female', 'ChemCorp'),
('Frank Bio', 'frank.bio@example.com', '09170000006', 'Male', 'BioInc'),
('Grace Metro', 'grace.metro@example.com', '09170000007', 'Female', 'MetroTrucks'),
('Hank Shelf', 'hank.shelf@example.com', '09170000008', 'Male', 'ShelfFoods'),
('Ivy Chem', 'ivy.chem@example.com', '09170000009', 'Female', 'ChemCorp'),
('Kara Metro', 'kara.metro@example.com', '09170000011', 'Female', 'MetroTrucks'),
('Leo Shelf', 'leo.shelf@example.com', '09170000012', 'Male', 'ShelfFoods'),
('Mona Chem', 'mona.chem@example.com', '09170000013', 'Female', 'ChemCorp'),
('Ned Bio', 'ned.bio@example.com', '09170000014', 'Male', 'BioInc'),
('Olive Metro', 'olive.metro@example.com', '09170000015', 'Female', 'MetroTrucks');

-- DUMMY CHEMISTRY APPOINTMENTS
-- Uses real chemistry service IDs: 1, 3, 5, 6, 7
INSERT INTO appointments (customer_id, service_id, appointment_date, status)
VALUES
  (1, 1, '2025-05-01', 'pending'),
  (2, 3, '2025-05-02', 'completed'),
  (3, 5, '2025-05-03', 'in progress'),
  (4, 6, '2025-05-04', 'pending'),
  (5, 7, '2025-05-05', 'completed');

-- Link appointment_details to the above appointments
INSERT INTO appointment_details (appointment_id, sample_description, name_of_samples, sample_type, sample_condition, sample_quantity, number_of_replicates, terms_accepted)
VALUES
  (1, 'Sample desc 1', 'Sample 1', 'Water', 'Normal', '10', 2, true),
  (2, 'Sample desc 2', 'Sample 2', 'Food', 'Chilled', '5', 1, true),
  (3, 'Sample desc 3', 'Sample 3', 'Soil', 'Ambient', '8', 3, true),
  (4, 'Sample desc 4', 'Sample 4', 'Water', 'Normal', '12', 2, true),
  (5, 'Sample desc 5', 'Sample 5', 'Food', 'Chilled', '7', 1, true);

-- Link chemistry_details to the above appointment_details
INSERT INTO chemistry_details (appointment_detail_id, analysis_requested, parameters, delivery_type, sample_quantity)
VALUES
  (1, 'Analysis 1', 'Param 1', 'Standard', '10'),
  (2, 'Analysis 2', 'Param 2', 'Express', '5'),
  (3, 'Analysis 3', 'Param 3', 'Standard', '8'),
  (4, 'Analysis 4', 'Param 4', 'Standard', '12'),
  (5, 'Analysis 5', 'Param 5', 'Express', '7');

-- DUMMY MICROBIOLOGY APPOINTMENTS
-- Uses real microbiology service IDs: 54, 55, 56, 57, 58
INSERT INTO appointments (customer_id, service_id, appointment_date, status)
VALUES
  (1, 54, '2025-06-01', 'pending'),
  (2, 55, '2025-06-02', 'completed'),
  (3, 56, '2025-06-03', 'in progress'),
  (4, 57, '2025-06-04', 'pending'),
  (5, 58, '2025-06-05', 'completed');

-- Link appointment_details to the above appointments
INSERT INTO appointment_details (appointment_id, sample_description, name_of_samples, sample_type, sample_condition, sample_quantity, number_of_replicates, terms_accepted)
VALUES
  (6, 'Bio desc 1', 'BioSample 1', 'Food', 'Chilled', '5', 1, true),
  (7, 'Bio desc 2', 'BioSample 2', 'Water', 'Ambient', '8', 2, true),
  (8, 'Bio desc 3', 'BioSample 3', 'Food', 'Normal', '10', 1, true),
  (9, 'Bio desc 4', 'BioSample 4', 'Plant', 'Chilled', '6', 2, true),
  (10, 'Bio desc 5', 'BioSample 5', 'Food', 'Ambient', '7', 1, true);

-- Link microbiology_details to the above appointment_details
INSERT INTO microbiology_details (appointment_detail_id, test_type, organism_target, sample_storage_condition, sample_quantity)
VALUES
  (6, 'TestType 1', 'E. coli', 'Chilled', '5'),
  (7, 'TestType 2', 'Coliform', 'Ambient', '8'),
  (8, 'TestType 3', 'Salmonella', 'Normal', '10'),
  (9, 'TestType 4', 'Yeast', 'Chilled', '6'),
  (10, 'TestType 5', 'Mold', 'Ambient', '7');

-- DUMMY METROLOGY APPOINTMENTS
-- Uses real metrology service IDs: 77, 78, 79
INSERT INTO appointments (customer_id, service_id, appointment_date, status)
VALUES
  (1, 77, '2025-07-01', 'pending'),
  (2, 78, '2025-07-02', 'completed'),
  (3, 79, '2025-07-03', 'in progress');

-- Link appointment_details to the above appointments
INSERT INTO appointment_details (appointment_id, plate_number, sample_description, name_of_samples, sample_type, sample_condition, sample_quantity, number_of_replicates, terms_accepted)
VALUES
  (11, 'ABC1', 'Metro desc 1', 'MetroSample 1', 'Liquid', 'Normal', '20', 1, true),
  (12, 'ABC2', 'Metro desc 2', 'MetroSample 2', 'Liquid', 'Normal', '25', 1, true),
  (13, 'ABC3', 'Metro desc 3', 'MetroSample 3', 'Liquid', 'Normal', '30', 1, true);

-- Link metrology_details to the above appointment_details
INSERT INTO metrology_details (appointment_detail_id, type_of_test, number_of_liters, instrument_type, truck_plate_number, manager_name, manager_contact, manager_approval_date, liquid_carried_liters)
VALUES
  (11, 'Type 1', 100, 'Instrument 1', 'ABC1', 'Manager 1', '09170000001', '2025-07-01', 100.0),
  (12, 'Type 2', 150, 'Instrument 2', 'ABC2', 'Manager 2', '09170000002', '2025-07-02', 150.0),
  (13, 'Type 3', 200, 'Instrument 3', 'ABC3', 'Manager 3', '09170000003', '2025-07-03', 200.0);

-- DUMMY SHELF-LIFE APPOINTMENTS
-- Uses real shelf-life service IDs: 80, 81, 82, 83
INSERT INTO appointments (customer_id, service_id, appointment_date, status)
VALUES
  (1, 80, '2025-08-01', 'pending'),
  (2, 81, '2025-08-02', 'completed'),
  (3, 82, '2025-08-03', 'in progress'),
  (4, 83, '2025-08-04', 'pending');

-- Link appointment_details to the above appointments
INSERT INTO appointment_details (appointment_id, sample_description, name_of_samples, sample_type, sample_condition, sample_quantity, number_of_replicates, terms_accepted)
VALUES
  (14, 'Shelf desc 1', 'ShelfSample 1', 'Packaged', 'Ambient', '15', 3, true),
  (15, 'Shelf desc 2', 'ShelfSample 2', 'Packaged', 'Ambient', '18', 2, true),
  (16, 'Shelf desc 3', 'ShelfSample 3', 'Packaged', 'Ambient', '20', 1, true),
  (17, 'Shelf desc 4', 'ShelfSample 4', 'Packaged', 'Ambient', '22', 2, true);

-- Link shelf_life_details to the above appointment_details
INSERT INTO shelf_life_details (appointment_detail_id, product_type, storage_conditions, shelf_life_duration, packaging_type, modes_of_deterioration)
VALUES
  (14, 'Product 1', 'Cool, dry', 12, 'Plastic', 'Moisture, Mold'),
  (15, 'Product 2', 'Cool, dry', 14, 'Glass', 'Oxidation'),
  (16, 'Product 3', 'Cool, dry', 16, 'Metal', 'Spoilage'),
  (17, 'Product 4', 'Cool, dry', 18, 'Paper', 'Contamination');

COMMIT;
