import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportsTable } from './reports-table';
import { Report } from '../models/report';
import { By } from '@angular/platform-browser';

describe('ReportsTable', () => {
  let component: ReportsTable;
  let fixture: ComponentFixture<ReportsTable>;

  const mockReports: Report[] = [
    { id: 1, name: 'Report A', createdDate: '2023-01-01', modifiedDate: '2023-01-02', ownerEmail: 'a@test.com', associatedForm: 'Form A' },
    { id: 2, name: 'Report B', createdDate: '2023-02-01', modifiedDate: '2023-02-02', ownerEmail: 'b@test.com', associatedForm: 'Form B' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportsTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportsTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a table row associated with each report', () => {
    component.reports = mockReports;
    fixture.detectChanges();
    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(2);
    const firstRowName = rows[0].query(By.css('.report-name')).nativeElement;
    expect(firstRowName.textContent).toContain('Report A');
  });

  it('should display "No reports" when the list is empty', () => {
    component.reports = [];
    fixture.detectChanges();
    const noDataMessage = fixture.debugElement.query(By.css('.no-reports-found'));
    expect(noDataMessage).toBeTruthy();
    expect(noDataMessage.nativeElement.textContent).toContain('No reports found');
  });
});
