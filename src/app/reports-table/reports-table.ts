import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Report } from '../models/report';

@Component({
  selector: 'app-reports-table',
  imports: [],
  templateUrl: './reports-table.html',
  styleUrl: './reports-table.css',
})
/**
 * Displays a list of reports with options to edit or delete.
 */
export class ReportsTable {
  /** The list of reports to display. */
  @Input() reports: Report[] = [];

  /** Emits the ID of the report to be deleted. */
  @Output() deleteRequest = new EventEmitter<number>();

  onDelete(reportId: number): void {
    this.deleteRequest.emit(reportId);
  }
}
