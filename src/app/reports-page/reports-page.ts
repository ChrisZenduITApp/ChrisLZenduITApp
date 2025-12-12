import { Component, OnInit } from '@angular/core';
import { ReportsTable } from '../reports-table/reports-table';
import { ReportsService, SortOrder } from '../services/reports.service';
import { inject } from '@angular/core';
import { Report } from '../models/report';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reports-page',
  imports: [ReportsTable, CommonModule, FormsModule],
  templateUrl: './reports-page.html',
  styleUrl: './reports-page.css',
})
/**
 * The top-level view for the Reports module.
 * Manages the fetching, filtering, sorting, and pagination state of reports.
 */
export class ReportsPage implements OnInit {
  private reportsService = inject(ReportsService)

  displayReports: Report[] = [];
  sortOrder: SortOrder = 'Newest';
  searchTerm = '';

  totalFilteredRecords = 0;
  pageSize = 5;
  currentPage = 1;
  maxVisiblePages = 4;

  ngOnInit(): void {
    // Must come before applying filter and sort or we overwrite with an incorrect value!
    this.applyFiltersAndSort();
  }

  getTotalPages(): number {
    return Math.ceil(this.totalFilteredRecords / this.pageSize);
  }

  applyFiltersAndSort(): void {
    
    let workingList = this.reportsService.getAllReports();

    workingList = this.reportsService.filterReports(workingList, this.searchTerm)

    workingList = this.reportsService.sortReports(workingList, this.sortOrder);

    this.totalFilteredRecords = workingList.length;

    // EDGE CASE: check if our current page is out of bounds.
    // This can happen after deleting the last element on a page, resulting in a ghost page.
    const totalPages = this.getTotalPages();

    if ((this.currentPage > totalPages) && (totalPages > 0)) {
      this.currentPage = totalPages;
    } else if (totalPages === 0) {
      this.currentPage = 1;
    }

    const startIndex = ((this.currentPage - 1) * this.pageSize);
    const endIndex = startIndex + this.pageSize;

    this.displayReports = workingList.slice(startIndex,endIndex);
  }

  goToPage(page: number): void {
    if (!((page < 1) || (page > this.getTotalPages()))) {
      this.currentPage = page;
      this.applyFiltersAndSort();
    }
  }

  confirmAndDelete(reportId: number): void {
    if (confirm('Are you sure you would like to delete this report?')) {
      this.deleteReport(reportId);
    }
  }

  deleteReport(id: number): void {
    this.reportsService.deleteReport(id);
    this.applyFiltersAndSort();
  }
  /**
   * Calculates the pagination window to display in the footer.
   * Handles logic for ellipses (...) and ensures the current page is visible.
   * @returns An array containing page numbers and ellipses (e.g., [1, 2,'...', 7, 8]).
   */
  getVisiblePages(): (number | string)[] {
    const totalPages = this.getTotalPages();
    const current = this.currentPage;
    const maxButtons = this.maxVisiblePages; 
    
    const pages: (number | string)[] = [];

    if (totalPages <= maxButtons) {
        for (let i = 1; i <= totalPages; i++) { pages.push(i); }
        return pages;
    }

    const windowSize = maxButtons - 2;
    const boundary = Math.floor(windowSize / 2);

    let startPage;
    let endPage;

    if (current <= maxButtons - boundary) { 
        startPage = 1;
        endPage = maxButtons;
    } 
    else if (current >= totalPages - (maxButtons - 1 - boundary)) {
        startPage = totalPages - maxButtons + 1;
        endPage = totalPages;
    } 
    else {
        startPage = current - boundary;
        endPage = current + boundary;
    }
    
    const pageSet = new Set<number | string>();

    for (let i = startPage; i <= endPage; i++) {
        pageSet.add(i);
    }
    
    pageSet.add(1);
    pageSet.add(totalPages);

    const sortedPages = Array.from(pageSet)
        .filter((p): p is number => typeof p === 'number')
        .sort((a, b) => a - b);

    let lastPage = 0;
    
    for (const page of sortedPages) {
        if (page - lastPage > 1 && lastPage !== 0) {
            pages.push('...');
        }
        pages.push(page);
        lastPage = page;
    }

    return pages.filter(p => typeof p === 'number' && p > 0 || p === '...');
  }
}