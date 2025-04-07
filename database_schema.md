# RSTL Appointment Portal Database Schema

## Database Entity Relationship Diagram

```
+----------------+     +----------------+     +----------------+     +----------------+
|     Users      |     |    Services    |     | Customers      |     |  Appointments  |
+----------------+     +----------------+     +----------------+     +----------------+
| id             |     | id             |     | id             |     | id             |
| name           |     | name           |     | name           |     | customer_id    |---> Customers.id
| email          |     | category       |     | email          |     | service_id     |---> Services.id
| password       |     | description    |     | contact_number |     | company_id     |---> Companies.id
| lab_access     |     | price          |     | sex            |     | truck_id       |---> Trucks.id
| role           |     | duration_minutes|    | company_name   |     | appointment_date|
| created_at     |     | active         |     | created_at     |     | appointment_time|
| updated_at     |     | created_at     |     | updated_at     |     | status         |
+----------------+     | updated_at     |     +----------------+     | created_at     |
       |               +----------------+            |               | updated_at     |
       |                      |                      |               +----------------+
       |                      |                      |                      |
       |                      |                      |                      |
       |                      v                      |                      v
       |               +-------------------+         |           +------------------+
       |               | LabAssignments    |         |           | AppointmentDetails|
       |               +-------------------+         |           +------------------+
       |               | id                |         |           | id               |
       |               | appointment_id    |---------|---------->| appointment_id   |---> Appointments.id
       |               | laboratory_id     |-------->|           | plate_number     |
       |               | assigned_by       |-------->|           | sample_description|
       |               | assigned_to       |-------->|           | name_of_samples  |
       |               | created_at        |         |           | sample_type      |
       |               | updated_at        |         |           | sample_condition |
       |               +-------------------+         |           | sample_quantity  |
       |                                             |           | number_of_replicates|
       v                                             |           | terms_accepted   |
+----------------+     +-------------------+         |           | created_at       |
| AdminAssignments|     | InquiryInformation|         |           | updated_at       |
+----------------+     +-------------------+         |           +------------------+
| id             |     | id                |         |                  |
| user_id        |---->| appointment_id    |---------|----------------->|
| laboratory     |     | mode_of_inquiry   |         |                  |
| is_primary     |     | rstl_personnel_id |-------->|                  |
| created_at     |     | response_deadline |         |                  |
| updated_at     |     | created_at        |         |                  |
+----------------+     | updated_at        |         |                  |
                       +-------------------+         |                  |
                                                     |                  |
                                                     |                  |
+---------------+     +----------------+             |                  |
|   Companies   |     |     Trucks     |             |                  |
+---------------+     +----------------+             |                  |
| id            |<----| id             |             |                  |
| name          |     | license_plate  |             |                  |
| contact_person|     | company_id     |---->|       |                  |
| contact_email |     | created_at     |             |                  |
| contact_phone |     | updated_at     |             |                  |
| business_permit|    +----------------+             |                  |
| oror_document |                                    |                  |
| reg_date      |     +-------------------+          |                  |
| verified      |     | AppointmentConstraints|      |                  |
| verified_date |     +-------------------+          |                  |
| license_plates|     | id                |          |                  |
| created_at    |     | constraint_date   |          |                  v
| updated_at    |     | daily_liter_capacity|   +------------------------------------------------------+
+---------------+     | max_appointments_per_day|  |                                                      |
                      | created_at        |     |                                                      |
                      | updated_at        |     v                                                      v
                      +-------------------+    +----------------+   +----------------+   +----------------+   +----------------+   +-------------------------+
                                               | MetrologyDetails|   | ChemistryDetails|  |MicrobiologyDetails| | ShelfLifeDetails|  |ResearchConsultationDetails|
                                               +----------------+   +----------------+   +----------------+   +----------------+   +-------------------------+
                                               | id             |   | id             |   | id             |   | id             |   | id                      |
                                               | app_detail_id  |-->| app_detail_id  |-->| app_detail_id  |-->| app_detail_id  |-->| app_detail_id           |
                                               | type_of_test   |   | analysis_requested| | test_type      |   | product_type   |   | research_topic          |
                                               | number_of_liters|   | parameters     |   | organism_target|   | storage_conditions| | consultation_type       |
                                               | instrument_type|   | delivery_type  |   | sample_storage |   | shelf_life_duration| | research_stage          |
                                               | truck_plate_number| | sample_quantity|   | sample_quantity|   | packaging_type |   | additional_requirements |
                                               | manager_name   |   | created_at     |   | created_at     |   | modes_of_deterioration| | created_at           |
                                               | manager_contact|   | updated_at     |   | updated_at     |   | created_at     |   | updated_at              |
                                               | manager_approval_date|               |   |               |   | updated_at     |   |                         |
                                               | liquid_carried_liters|               |   |               |   |               |   |                         |
                                               | created_at     |   |               |   |               |   |               |   |                         |
                                               | updated_at     |   |               |   |               |   |               |   |                         |
                                               +----------------+   +----------------+   +----------------+   +----------------+   +-------------------------+

+------------------+
|   TestResults    |
+------------------+
| id               |
| appointment_id   |---> Appointments.id
| result_data      |
| result_file_path |
| conducted_by     |---> Users.id
| created_at       |
| updated_at       |
+------------------+

+----------------+      +----------------+      +----------------+
|  ActionLogs    |      |   Remarks      |      |  TestResults   |
+----------------+      +----------------+      +----------------+
| id             |      | id             |      | id             |
| appointment_id |----->| appointment_id |----->| appointment_id |---> Appointments.id
| action_type    |      | remark_text    |      | result_data    |
| action_desc    |      | remark_type    |      | result_file_path|
| performed_by   |----->| created_by     |----->| conducted_by   |---> Users.id
| created_at     |      | created_at     |      | created_at     |
| updated_at     |      |                |      | updated_at     |
+----------------+      +----------------+      +----------------+
```

## Table Definitions

### 1. Users Table

Stores information about administrators and laboratory staff with access to the system.

| Column         | Type        | Constraints                  | Description                                      |
|----------------|-------------|------------------------------|--------------------------------------------------|
| id             | SERIAL      | PRIMARY KEY                  | Unique identifier for the admin/staff user       |
| name           | VARCHAR(255)| NOT NULL                     | Full name of the admin/staff                     |
| email          | VARCHAR(255)| UNIQUE, NOT NULL             | Email address (used for login)                   |
| password       | VARCHAR(255)| NOT NULL                     | Hashed password                                  |
| lab_access     | VARCHAR(255)|                              | Comma-separated list of accessible laboratories  |
| role           | VARCHAR(50) | NOT NULL, DEFAULT 'staff'    | User role: 'admin', 'manager', or 'staff'        |
| created_at     | TIMESTAMP   | DEFAULT CURRENT_TIMESTAMP    | Record creation timestamp                        |
| updated_at     | TIMESTAMP   | DEFAULT CURRENT_TIMESTAMP    | Record last update timestamp                     |

### 2. Customers Table

Stores information about customers who request appointments (no login accounts).

| Column         | Type        | Constraints                  | Description                                      |
|----------------|-------------|------------------------------|--------------------------------------------------|
| id             | SERIAL      | PRIMARY KEY                  | Unique identifier for the customer               |
| name           | VARCHAR(255)| NOT NULL                     | Full name of the customer                        |
| email          | VARCHAR(255)|                              | Email address                                    |
| contact_number | VARCHAR(50) |                              | Customer's phone number                          |
| sex            | VARCHAR(10) |                              | Gender (Male/Female/Other)                       |
| company_name   | VARCHAR(255)|                              | Organization/company the customer represents     |
| created_at     | TIMESTAMP   | DEFAULT CURRENT_TIMESTAMP    | Record creation timestamp                        |
| updated_at     | TIMESTAMP   | DEFAULT CURRENT_TIMESTAMP    | Record last update timestamp                     |

### 3. Companies Table

Stores verified company information primarily for metrology services.

| Column          | Type        | Constraints                  | Description                                      |
|-----------------|-------------|------------------------------|--------------------------------------------------|
| id              | SERIAL      | PRIMARY KEY                  | Unique identifier for the company                |
| name            | VARCHAR(100)| NOT NULL                     | Company name                                     |
| contact_person  | VARCHAR(100)|                              | Primary contact person at the company            |
| contact_email   | VARCHAR(100)|                              | Email address for company contact                |
| contact_phone   | VARCHAR(50) |                              | Phone number for company contact                 |
| business_permit | BYTEA       |                              | Stored business permit document                  |
| oror_document   | BYTEA       |                              | Other regulatory/required documents              |
| reg_date        | DATE        |                              | Date of company registration                     |
| verified        | BOOLEAN     | DEFAULT FALSE                | Whether company is verified                      |
| verified_date   | DATE        |                              | Date when verification was completed             |
| license_plates  | VARCHAR(255)|                              | Comma-separated list of company truck plates     |
| created_at      | TIMESTAMP   | DEFAULT CURRENT_TIMESTAMP    | Record creation timestamp                        |
| updated_at      | TIMESTAMP   | DEFAULT CURRENT_TIMESTAMP    | Record last update timestamp                     |

### 4. Trucks Table

Stores information about trucks used in metrology appointments.

| Column         | Type        | Constraints                  | Description                                      |
|----------------|-------------|------------------------------|--------------------------------------------------|
| id             | SERIAL      | PRIMARY KEY                  | Unique identifier for the truck                  |
| license_plate  | VARCHAR(50) | NOT NULL, UNIQUE             | License plate number                             |
| company_id     | INTEGER     | REFERENCES companies(id)      | Company that owns the truck                      |
| created_at     | TIMESTAMP   | DEFAULT CURRENT_TIMESTAMP    | Record creation timestamp                        |
| updated_at     | TIMESTAMP   | DEFAULT CURRENT_TIMESTAMP    | Record last update timestamp                     |

### 5. Services Table

Defines different types of laboratory services offered.

| Column           | Type          | Constraints               | Description                                      |
|------------------|---------------|---------------------------|--------------------------------------------------|
| id               | SERIAL        | PRIMARY KEY               | Unique identifier for the service                |
| name             | VARCHAR(255)  | NOT NULL                  | Service name                                     |
| category         | VARCHAR(50)   | NOT NULL                  | Service category (metrology, chemistry, etc.)    |
| description      | TEXT          |                           | Detailed description of the service              |
| price            | DECIMAL(10,2) |                           | Cost of the service                              |
| duration_minutes | INTEGER       |                           | Estimated time to complete the service           |
| active           | BOOLEAN       | DEFAULT TRUE              | Whether the service is currently available       |
| created_at       | TIMESTAMP     | DEFAULT CURRENT_TIMESTAMP | Record creation timestamp                        |
| updated_at       | TIMESTAMP     | DEFAULT CURRENT_TIMESTAMP | Record last update timestamp                     |

### 6. Appointments Table

Stores appointment bookings.

| Column           | Type          | Constraints               | Description                                      |
|------------------|---------------|---------------------------|--------------------------------------------------|
| id               | SERIAL        | PRIMARY KEY               | Unique identifier for the appointment            |
| customer_id      | INTEGER       | REFERENCES customers(id)   | Customer who created the appointment             |
| service_id       | INTEGER       | REFERENCES services(id)    | Service requested                                |
| company_id       | INTEGER       | REFERENCES companies(id)   | Associated company (for metrology)               |
| truck_id         | INTEGER       | REFERENCES trucks(id)       | Associated truck (for metrology)                 |
| appointment_date | DATE          | NOT NULL                  | Date of the appointment                          |
| appointment_time | TIME          |                           | Time of the appointment                          |
| status           | VARCHAR(50)   | DEFAULT 'pending'         | Status: 'pending', 'confirmed', 'completed', 'cancelled' |
| created_at       | TIMESTAMP     | DEFAULT CURRENT_TIMESTAMP | Record creation timestamp                        |
| updated_at       | TIMESTAMP     | DEFAULT CURRENT_TIMESTAMP | Record last update timestamp                     |

### 7. AppointmentConstraints Table

Defines operational constraints for appointments, primarily for metrology.

| Column                  | Type           | Constraints               | Description                                      |
|-------------------------|----------------|---------------------------|--------------------------------------------------|
| id                      | SERIAL         | PRIMARY KEY               | Unique identifier                                |
| constraint_date         | DATE           | NOT NULL                  | Date when constraints apply                      |
| daily_liter_capacity    | DECIMAL(10,2)  | NOT NULL                  | Maximum total liters that can be calibrated per day |
| max_appointments_per_day| INTEGER        |                           | Maximum number of appointments per day           |
| created_at              | TIMESTAMP      | DEFAULT CURRENT_TIMESTAMP | Record creation timestamp                        |
| updated_at              | TIMESTAMP      | DEFAULT CURRENT_TIMESTAMP | Record last update timestamp                     |

### 8. AdminAssignments Table

Maps administrators to their assigned laboratories.

| Column           | Type          | Constraints                 | Description                                      |
|------------------|---------------|----------------------------|--------------------------------------------------|
| id               | SERIAL        | PRIMARY KEY                | Unique identifier                                |
| user_id          | INTEGER       | REFERENCES users(id)         | Admin/staff user                                 |
| laboratory       | VARCHAR(100)  | NOT NULL                   | Laboratory section assigned to (metrology, chemistry, etc.) |
| is_primary       | BOOLEAN       | DEFAULT FALSE              | Whether this is the primary assignment           |
| created_at       | TIMESTAMP     | DEFAULT CURRENT_TIMESTAMP  | Record creation timestamp                        |
| updated_at       | TIMESTAMP     | DEFAULT CURRENT_TIMESTAMP  | Record last update timestamp                     |

### 9. InquiryInformation Table

Stores details about the inquiry process.

| Column           | Type          | Constraints               | Description                                      |
|------------------|---------------|---------------------------|--------------------------------------------------|
| id               | SERIAL        | PRIMARY KEY               | Unique identifier for the inquiry info           |
| appointment_id   | INTEGER       | REFERENCES appointments(id)| Associated appointment                           |
| mode_of_inquiry  | VARCHAR(50)   |                           | How the inquiry was made (phone, email, walk-in) |
| rstl_personnel_id| INTEGER       | REFERENCES users(id)       | RSTL staff member who handled the inquiry        |
| response_deadline| DATE          |                           | Deadline for response to inquiry                 |
| created_at       | TIMESTAMP     | DEFAULT CURRENT_TIMESTAMP | Record creation timestamp                        |
| updated_at       | TIMESTAMP     | DEFAULT CURRENT_TIMESTAMP | Record last update timestamp                     |

### 10. AppointmentDetails Table

Common details for all types of appointments.

| Column              | Type          | Constraints               | Description                                      |
|---------------------|---------------|---------------------------|--------------------------------------------------|
| id                  | SERIAL        | PRIMARY KEY               | Unique identifier for the appointment details    |
| appointment_id      | INTEGER       | REFERENCES appointments(id)| Associated appointment                           |
| plate_number        | VARCHAR(50)   |                           | Vehicle plate number                             |
| sample_description  | TEXT          |                           | General description of the sample                |
| name_of_samples     | VARCHAR(255)  |                           | Name identifier for the samples                  |
| sample_type         | VARCHAR(100)  |                           | Type of sample (general classification)          |
| sample_condition    | VARCHAR(100)  |                           | Physical condition of the sample                 |
| sample_quantity     | INTEGER       |                           | Quantity of samples provided                     |
| number_of_replicates| INTEGER       |                           | Number of test replicates required               |
| terms_accepted      | BOOLEAN       | DEFAULT FALSE             | Whether terms were accepted                      |
| created_at          | TIMESTAMP     | DEFAULT CURRENT_TIMESTAMP | Record creation timestamp                        |
| updated_at          | TIMESTAMP     | DEFAULT CURRENT_TIMESTAMP | Record last update timestamp                     |

### 11. MetrologyDetails Table

Specific details for metrology appointments.

| Column           | Type          | Constraints                      | Description                                      |
|------------------|---------------|----------------------------------|--------------------------------------------------|
| id               | SERIAL        | PRIMARY KEY                      | Unique identifier                                |
| appointment_detail_id | INTEGER  | REFERENCES appointment_details(id) | Associated appointment details                    |
| type_of_test     | VARCHAR(100)  | NOT NULL                         | Type of metrology test                           |
| number_of_liters | INTEGER       |                                  | Volume for calibration (if applicable)           |
| instrument_type  | VARCHAR(100)  |                                  | Type of instrument being calibrated              |
| truck_plate_number | VARCHAR(50) |                                  | Plate number of truck carrying equipment         |
| manager_name     | VARCHAR(255)  |                                  | Name of manager approving the appointment        |
| manager_contact  | VARCHAR(100)  |                                  | Contact information of approving manager         |
| manager_approval_date | DATE     |                                  | Date when manager approved the appointment       |
| liquid_carried_liters | DECIMAL(10,2) |                             | Amount of liquid carried for calibration         |
| created_at       | TIMESTAMP     | DEFAULT CURRENT_TIMESTAMP        | Record creation timestamp                        |
| updated_at       | TIMESTAMP     | DEFAULT CURRENT_TIMESTAMP        | Record last update timestamp                     |

### 12. ChemistryDetails Table

Specific details for chemistry appointments.

| Column            | Type          | Constraints                      | Description                                      |
|-------------------|---------------|----------------------------------|--------------------------------------------------|
| id                | SERIAL        | PRIMARY KEY                      | Unique identifier                                |
| appointment_detail_id | INTEGER   | REFERENCES appointment_details(id) | Associated appointment details                    |
| analysis_requested| TEXT          |                                  | Specific analysis tests requested                |
| parameters        | TEXT          |                                  | Parameters to measure in the analysis            |
| delivery_type     | VARCHAR(100)  |                                  | Method of sample delivery                        |
| sample_quantity   | INTEGER       |                                  | Number of samples provided                       |
| created_at        | TIMESTAMP     | DEFAULT CURRENT_TIMESTAMP        | Record creation timestamp                        |
| updated_at        | TIMESTAMP     | DEFAULT CURRENT_TIMESTAMP        | Record last update timestamp                     |

### 13. MicrobiologyDetails Table

Specific details for microbiology appointments.

| Column                | Type          | Constraints                      | Description                                      |
|-----------------------|---------------|----------------------------------|--------------------------------------------------|
| id                    | SERIAL        | PRIMARY KEY                      | Unique identifier                                |
| appointment_detail_id | INTEGER       | REFERENCES appointment_details(id) | Associated appointment details                    |
| test_type             | VARCHAR(100)  |                                  | Type of microbiology test                        |
| organism_target       | VARCHAR(100)  |                                  | Target organism for testing                      |
| sample_storage_condition | VARCHAR(100) |                                | How sample was stored                            |
| sample_quantity       | INTEGER       |                                  | Number of samples provided                       |
| created_at            | TIMESTAMP     | DEFAULT CURRENT_TIMESTAMP        | Record creation timestamp                        |
| updated_at            | TIMESTAMP     | DEFAULT CURRENT_TIMESTAMP        | Record last update timestamp                     |

### 14. ShelfLifeDetails Table

Specific details for shelf life testing appointments.

| Column                | Type          | Constraints                      | Description                                      |
|-----------------------|---------------|----------------------------------|--------------------------------------------------|
| id                    | SERIAL        | PRIMARY KEY                      | Unique identifier                                |
| appointment_detail_id | INTEGER       | REFERENCES appointment_details(id) | Associated appointment details                    |
| product_type          | VARCHAR(100)  |                                  | Type of product being tested                     |
| storage_conditions    | TEXT          |                                  | Storage conditions for testing                   |
| shelf_life_duration   | INTEGER       |                                  | Expected shelf life (days/months)                |
| packaging_type        | VARCHAR(100)  |                                  | Packaging material used                          |
| modes_of_deterioration| TEXT          |                                  | Expected modes of deterioration                  |
| created_at            | TIMESTAMP     | DEFAULT CURRENT_TIMESTAMP        | Record creation timestamp                        |
| updated_at            | TIMESTAMP     | DEFAULT CURRENT_TIMESTAMP        | Record last update timestamp                     |

### 15. ResearchConsultationDetails Table

Specific details for research consultation appointments.

| Column                | Type          | Constraints                      | Description                                      |
|-----------------------|---------------|----------------------------------|--------------------------------------------------|
| id                    | SERIAL        | PRIMARY KEY                      | Unique identifier                                |
| appointment_detail_id | INTEGER       | REFERENCES appointment_details(id) | Associated appointment details                    |
| research_topic        | TEXT          |                                  | Topic of research                                |
| consultation_type     | VARCHAR(100)  |                                  | Type of consultation needed                      |
| research_stage        | VARCHAR(100)  |                                  | Current stage of the research                    |
| additional_requirements | TEXT        |                                  | Any special requirements                         |
| created_at            | TIMESTAMP     | DEFAULT CURRENT_TIMESTAMP        | Record creation timestamp                        |
| updated_at            | TIMESTAMP     | DEFAULT CURRENT_TIMESTAMP        | Record last update timestamp                     |

### 16. TestResults Table

Stores results of laboratory tests.

| Column           | Type          | Constraints                 | Description                                      |
|------------------|---------------|----------------------------|--------------------------------------------------|
| id               | SERIAL        | PRIMARY KEY                | Unique identifier                                |
| appointment_id   | INTEGER       | REFERENCES appointments(id)| Associated appointment                           |
| result_data      | JSONB         |                            | Test results in JSON format                      |
| result_file_path | VARCHAR(255)  |                            | Path to stored result files/documents            |
| conducted_by     | INTEGER       | REFERENCES users(id)       | User (staff) who conducted the test              |
| created_at       | TIMESTAMP     | DEFAULT CURRENT_TIMESTAMP  | Record creation timestamp                        |
| updated_at       | TIMESTAMP     | DEFAULT CURRENT_TIMESTAMP  | Record last update timestamp                     |

### 17. ActionLogs Table

Tracks actions taken on appointments.

| Column           | Type          | Constraints                 | Description                                      |
|------------------|---------------|----------------------------|--------------------------------------------------|
| id               | SERIAL        | PRIMARY KEY                | Unique identifier                                |
| appointment_id   | INTEGER       | REFERENCES appointments(id)| Associated appointment                           |
| action_type      | VARCHAR(50)   |                            | Type of action ('lab', 'cro', etc.)              |
| action_desc      | TEXT          |                            | Description of the action taken                  |
| performed_by     | INTEGER       | REFERENCES users(id)       | User who performed the action                    |
| created_at       | TIMESTAMP     | DEFAULT CURRENT_TIMESTAMP  | Record creation timestamp                        |

### 18. Remarks Table

Stores remarks and comments about appointments.

| Column           | Type          | Constraints                 | Description                                      |
|------------------|---------------|----------------------------|--------------------------------------------------|
| id               | SERIAL        | PRIMARY KEY                | Unique identifier                                |
| appointment_id   | INTEGER       | REFERENCES appointments(id)| Associated appointment                           |
| remark_text      | TEXT          |                            | Text of the remark/comment                       |
| remark_type      | VARCHAR(50)   |                            | Type of remark ('lab', 'cro', 'combined')        |
| created_by       | INTEGER       | REFERENCES users(id)       | User who created the remark                      |
| created_at       | TIMESTAMP     | DEFAULT CURRENT_TIMESTAMP  | Record creation timestamp                        |

### 19. LabAssignments Table

Tracks which laboratory and staff are assigned to specific appointments.

| Column           | Type          | Constraints                 | Description                                      |
|------------------|---------------|----------------------------|--------------------------------------------------|
| id               | SERIAL        | PRIMARY KEY                | Unique identifier                                |
| appointment_id   | INTEGER       | REFERENCES appointments(id)| Associated appointment                           |
| laboratory_id    | INTEGER       | REFERENCES services(id)    | Laboratory/service assigned                      |
| assigned_by      | INTEGER       | REFERENCES users(id)       | User who made the assignment                     |
| assigned_to      | INTEGER       | REFERENCES users(id)       | Staff member assigned to handle                  |
| created_at       | TIMESTAMP     | DEFAULT CURRENT_TIMESTAMP  | Record creation timestamp                        |
| updated_at       | TIMESTAMP     | DEFAULT CURRENT_TIMESTAMP  | Record last update timestamp                     |

## Database Relationships

1. **One Customer can have Many Appointments**
   - One-to-Many relationship from Customers to Appointments

2. **One Service can have Many Appointments**
   - One-to-Many relationship from Services to Appointments

3. **One Company can have Many Appointments**
   - One-to-Many relationship from Companies to Appointments
   
4. **One Company can have Many Trucks**
   - One-to-Many relationship from Companies to Trucks
   
5. **One Truck can have Many Appointments**
   - One-to-Many relationship from Trucks to Appointments

6. **One Appointment has One AppointmentDetails**
   - One-to-One relationship from Appointments to AppointmentDetails

7. **One AppointmentDetails has One Specialized Details table**
   - One-to-One relationship from AppointmentDetails to one of:
     - MetrologyDetails
     - ChemistryDetails
     - MicrobiologyDetails
     - ShelfLifeDetails
     - ResearchConsultationDetails

8. **One Appointment can have Many TestResults**
   - One-to-Many relationship from Appointments to TestResults

9. **One User can have Many AdminAssignments**
   - One-to-Many relationship from Users to AdminAssignments

10. **One Appointment has One InquiryInformation**
    - One-to-One relationship from Appointments to InquiryInformation

11. **One Appointment can have Many ActionLogs**
    - One-to-Many relationship from Appointments to ActionLogs

12. **One Appointment can have Many Remarks**
    - One-to-Many relationship from Appointments to Remarks

13. **One Appointment can have Many LabAssignments**
    - One-to-Many relationship from Appointments to LabAssignments

## Report View Generation

To generate the comprehensive report view shown in the header image, you would create a SQL view or stored procedure that joins these tables:

```sql
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
        (SELECT c.name FROM companies c WHERE c.id = a.company_id)
    ELSE NULL END AS company_name
FROM 
    appointments a
JOIN 
    customers c ON a.customer_id = c.id
JOIN 
    services s ON a.service_id = s.id
JOIN 
    appointment_details ad ON a.id = ad.appointment_id
LEFT JOIN 
    inquiry_information i ON a.id = i.appointment_id
LEFT JOIN 
    users u_personnel ON i.rstl_personnel_id = u_personnel.id
LEFT JOIN 
    lab_assignments la ON a.id = la.appointment_id;
```

This view would provide a single, denormalized representation of appointment data suitable for generating reports matching the structure in your header image. 