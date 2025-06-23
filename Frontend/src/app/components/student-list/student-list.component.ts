import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentService, Student } from '../../services/student.service';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  searchQuery = '';
  sortKey: keyof Student | null = null;
  sortAsc: boolean = true;

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.fetchStudents();
  }

  fetchStudents(): void {
    this.studentService.getStudents(this.searchQuery).subscribe(data => {
      this.students = data;
      this.applySorting();
    });
  }

  applySorting(): void {
    if (this.sortKey !== null) {
      const key = this.sortKey; // TypeScript now infers key as keyof Student
  
      this.students.sort((a, b) => {
        const aValue = String(a[key] ?? '').toLowerCase();
        const bValue = String(b[key] ?? '').toLowerCase();
        return this.sortAsc ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      });
    }
  }

  setSort(key: keyof Student): void {
    if (this.sortKey === key) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortKey = key;
      this.sortAsc = true;
    }
    this.applySorting();
  }

  onSearchChange(): void {
    this.fetchStudents();
  }
}
