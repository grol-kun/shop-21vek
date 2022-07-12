import { Component } from '@angular/core';
import { filter, fromEvent, map, debounceTime, distinctUntilChanged, mergeMap, from, catchError, of, switchMap } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  input: HTMLInputElement | null = null;
  ul: HTMLUListElement | null = null;

  ngOnInit(): void {
    this.input = document.querySelector('input');
    this.ul = document.querySelector('ul');

    fromEvent(this.input as any, 'keyup').pipe(
      debounceTime(700),
      distinctUntilChanged(),
      map((event: any) => event.target.value),
      filter((value) => value.length >= 1),
      switchMap(value => {
        return (this.getUsersRepsFromAPI(value)).pipe(
          catchError(err => of([]))
        )
      })
    ).subscribe({
      next: reps => this.recordRepsToList(reps),
      error: console.log
    });
  }


  getUsersRepsFromAPI(username: any) {
    //const url = `https://api.github.com/users/${username}/repos`;
    const url = `http://localhost:3004/goods/search?text=${username}`

    return fromFetch(url).pipe(
      switchMap(response => {
        if (response.ok) {
          // OK return data
          return response.json();
        } else {
          return of({ error: true, message: `Error ${response.status}` });
        }
      }),
      catchError(err => {
        // Network or other error, handle appropriately
        console.error(err);
        return of({ error: true, message: err.message })
      })
    );

  }

  recordRepsToList(reps: string | any[]) {
    if (this.ul === null) {
      return;
    }
    for (let i = 0; i < reps.length; i++) {
      // если элемент не существует, то создаем его
      if (!this.ul.children[i]) {
        const newEl = document.createElement('li');
        this.ul.appendChild(newEl);
      }
      // записываем название репозитория в элемент
      const li = this.ul.children[i];
      li.innerHTML = reps[i].name;
    }
    // удаляем оставшиеся элементы
    while (this.ul.children.length > reps.length) {
      this.ul.removeChild(this.ul.lastChild!);
    }
  }

}
