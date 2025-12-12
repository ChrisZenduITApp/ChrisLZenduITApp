import { Report } from "../models/report";
import { Injectable } from "@angular/core";

export type SortOrder = 'Newest' | 'Oldest';

@Injectable({
    providedIn: 'root' 
})

export class ReportsService {

    private reports: Report[] = [...MOCK_REPORTS];

    /**
     * Returns a copy of all reports.
     * @returns A shallow copy of the reports array.
     */
    getAllReports(): Report[]{
        return [...this.reports];
    }

    /**
     * Sorts a given list of reports by creation date.
     * @param list - The array of reports to sort.
     * @param sortOrder - Whether to sort by 'Newest' or 'Oldest').
     * @returns The (new) sorted array.
     */
    sortReports(list: Report[], sortOrder: SortOrder): Report[] {
        return [...list].sort((a,b) => {
            const dateA = new Date(a.createdDate).getTime();
            const dateB = new Date(b.createdDate).getTime();

            return sortOrder === 'Newest' ? dateB - dateA : dateA - dateB;
        });
    } 

    /**
     * Filters all reports against name, email, or form.
     * @param list - The array of reports to filter.
     * @param term - The query/search string.
     * @returns The filtered array of reports.
     */
    filterReports(list: Report[], term: string): Report[] {
        if (!term) {
            return list;
        }

        const lowerTerm = term.toLowerCase();

        return list.filter( report => 
            report.name.toLowerCase().includes(lowerTerm) ||
            report.ownerEmail.toLowerCase().includes(lowerTerm) ||
            report.associatedForm.toLowerCase().includes(lowerTerm)
        );
    }

    /**
     * Deletes a report from the internal storage given an id.
     * @param id - The unique ID attribute of the report to delete.
     */
    deleteReport(id: number): void{
        this.reports = this.reports.filter(report => report.id !== id);
    }
}

const MOCK_REPORTS: Report[] = [
{ id: 1, name: 'Inventory Brief 665', createdDate: 'Jul 05, 2021', modifiedDate: 'Jul 19, 2021', ownerEmail: 'eva.walker@demo.net', associatedForm: 'Vendor Inspection Form v3' },
    { id: 2, name: 'Safety Checklist 218', createdDate: 'Jun 10, 2023', modifiedDate: 'Jun 20, 2023', ownerEmail: 'paul.thomas@demo.net', associatedForm: 'Shipping Feedback Form v5' },
    { id: 3, name: 'Weekly Statement 220', createdDate: 'May 13, 2022', modifiedDate: 'Jun 03, 2022', ownerEmail: 'bob.clark@demo.net', associatedForm: 'Facility Timesheet v2' },
    { id: 4, name: 'Safety Memo 776', createdDate: 'Aug 30, 2021', modifiedDate: 'Sep 21, 2021', ownerEmail: 'laura.doe@example.com', associatedForm: 'Payment Log Sheet v1' },
    { id: 5, name: 'Annual Update 587', createdDate: 'Sep 20, 2022', modifiedDate: 'Sep 28, 2022', ownerEmail: 'steve.johnson@demo.net', associatedForm: 'Request Timesheet v5' },
    { id: 6, name: 'Daily Plan 171', createdDate: 'Dec 19, 2022', modifiedDate: 'Dec 23, 2022', ownerEmail: 'victor.gonzalez@test.org', associatedForm: 'Service Request Form v3' },
    { id: 7, name: 'Incident Memo 140', createdDate: 'Nov 11, 2022', modifiedDate: 'Nov 25, 2022', ownerEmail: 'steve.lopez@demo.net', associatedForm: 'Customer Contract v4' },
    { id: 8, name: 'Inventory Statement 507', createdDate: 'Aug 11, 2022', modifiedDate: 'Sep 07, 2022', ownerEmail: 'nina.doe@zenduit.com', associatedForm: 'Driver Evaluation v4' },
    { id: 9, name: 'HR Forecast 417', createdDate: 'May 06, 2022', modifiedDate: 'May 13, 2022', ownerEmail: 'tom.anderson@zenduit.com', associatedForm: 'Site Declaration v5' },
    { id: 10, name: 'Fiscal Forecast 778', createdDate: 'May 05, 2023', modifiedDate: 'May 19, 2023', ownerEmail: 'henry.martin@zenduit.com', associatedForm: 'Invoice Evaluation v3' },
    { id: 11, name: 'Budget details 265', createdDate: 'Feb 11, 2021', modifiedDate: 'Feb 12, 2021', ownerEmail: 'zack.miller@demo.net', associatedForm: 'Vendor Contract v3' },
    { id: 12, name: 'Audit Checklist 142', createdDate: 'Jul 26, 2021', modifiedDate: 'Aug 18, 2021', ownerEmail: 'paul.smith@demo.net', associatedForm: 'Vendor Waiver v1' },
    { id: 13, name: 'Budget Analysis 744', createdDate: 'Mar 31, 2023', modifiedDate: 'Apr 26, 2023', ownerEmail: 'laura.perez@example.com', associatedForm: 'Employee Evaluation v1' },
    { id: 14, name: 'Revenue Overview 779', createdDate: 'Jul 15, 2021', modifiedDate: 'Jul 18, 2021', ownerEmail: 'charlie.gonzalez@example.com', associatedForm: 'Product Inspection Form v5' },
    { id: 15, name: 'Compliance Forecast 844', createdDate: 'Mar 21, 2022', modifiedDate: 'Apr 15, 2022', ownerEmail: 'frank.gonzalez@example.com', associatedForm: 'Service Timesheet v3' },
    { id: 16, name: 'Sales Sheet 819', createdDate: 'Oct 16, 2023', modifiedDate: 'Oct 24, 2023', ownerEmail: 'david.thompson@test.org', associatedForm: 'Vehicle Application v3' },
    { id: 17, name: 'Project Overview 171', createdDate: 'Apr 05, 2021', modifiedDate: 'Apr 08, 2021', ownerEmail: 'rachel.martin@test.org', associatedForm: 'Vendor Release v1' },
    { id: 18, name: 'Annual Tracker 864', createdDate: 'Apr 18, 2023', modifiedDate: 'May 08, 2023', ownerEmail: 'jane.robinson@zenduit.com', associatedForm: 'Training Waiver v1' },
    { id: 19, name: 'Inspection Review 405', createdDate: 'Feb 02, 2023', modifiedDate: 'Feb 27, 2023', ownerEmail: 'ivy.brown@test.org', associatedForm: 'Product Declaration v5' },
    { id: 20, name: 'Safety Statement 267', createdDate: 'Mar 06, 2023', modifiedDate: 'Mar 15, 2023', ownerEmail: 'grace.brown@test.org', associatedForm: 'Facility Assessment v3' },
    { id: 21, name: 'Revenue Report 585', createdDate: 'May 13, 2022', modifiedDate: 'Jun 08, 2022', ownerEmail: 'oscar.rodriguez@test.org', associatedForm: 'Training Consent v4' },
    { id: 22, name: 'Monthly Overview 612', createdDate: 'Jan 14, 2022', modifiedDate: 'Jan 25, 2022', ownerEmail: 'paul.martin@demo.net', associatedForm: 'Quality Consent v4' },
    { id: 23, name: 'Inspection Report 784', createdDate: 'Dec 06, 2022', modifiedDate: 'Dec 26, 2022', ownerEmail: 'grace.martin@test.org', associatedForm: 'Request Consent v5' },
    { id: 24, name: 'Revenue Log 718', createdDate: 'Aug 21, 2023', modifiedDate: 'Sep 06, 2023', ownerEmail: 'xander.thompson@test.org', associatedForm: 'Equipment Request Form v4' },
    { id: 25, name: 'Weekly Checklist 974', createdDate: 'Dec 28, 2021', modifiedDate: 'Jan 16, 2022', ownerEmail: 'wendy.lee@zenduit.com', associatedForm: 'Vendor Timesheet v1' },
    { id: 26, name: 'Compliance Tracker 297', createdDate: 'Mar 10, 2022', modifiedDate: 'Mar 30, 2022', ownerEmail: 'john.smith@demo.net', associatedForm: 'Equipment Contract v2' },
    { id: 27, name: 'Safety Register 420', createdDate: 'Dec 01, 2021', modifiedDate: 'Dec 18, 2021', ownerEmail: 'mike.lewis@demo.net', associatedForm: 'Product Request Form v2' },
    { id: 28, name: 'Incident details 695', createdDate: 'Apr 24, 2023', modifiedDate: 'Apr 26, 2023', ownerEmail: 'jack.thomas@zenduit.com', associatedForm: 'Site Evaluation v2' },
    { id: 29, name: 'Quarterly Schedule 776', createdDate: 'Nov 19, 2022', modifiedDate: 'Dec 11, 2022', ownerEmail: 'john.perez@example.com', associatedForm: 'Receiving Waiver v1' },
    { id: 30, name: 'Maintenance Tracker 770', createdDate: 'Jan 20, 2022', modifiedDate: 'Feb 03, 2022', ownerEmail: 'victor.martinez@demo.net', associatedForm: 'Receiving Request Form v5' },
];