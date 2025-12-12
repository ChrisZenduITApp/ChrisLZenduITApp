import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportsPage } from './reports-page';
import { ReportsService } from '../services/reports.service';

describe('ReportsPage', () => {
  let component: ReportsPage;
  let fixture: ComponentFixture<ReportsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportsPage],
      providers: [
        {
          provide: ReportsService,
          useValue: {
            getAllReports: () => [],
            filterReports: () => [],
            sortReports: () => [],
            deleteReport: () => []
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should calculate total pages correctly', () => {
    component.totalFilteredRecords = 20;
    component.pageSize = 5;
    expect(component.getTotalPages()).toBe(4);
  });
});
