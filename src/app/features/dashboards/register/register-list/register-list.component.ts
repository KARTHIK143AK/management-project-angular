import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { InternalGoService } from '@services/internal_go.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AsyncPipe],
  providers: [],
  templateUrl: './register-list.component.html',
  styleUrls: ['./register-list.component.scss']
})
export class RegisterListComponent {

  public registrations: any
  registrations$!: Observable<any[]>;
  constructor(private router: Router,private internalGoService: InternalGoService) {
    
  }

  async ngOnInit() {
    console.log(">>>>ngOnInitngOnInit")
    this.registrations$ = this.internalGoService.getRegistrations().pipe(
      map((result: any) => result.data?.registrations || [])
    );
  }

  navigate(path: string) {
    // Navigate to the specified path
    this.router.navigate(['/dashboard/register/create']);
  }

}