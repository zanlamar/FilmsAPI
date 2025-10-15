import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
    selector: '[appScrollEnd]',
    standalone: true
})
export class ScrollEndDirective {
    @Output() scrolledToEnd = new EventEmitter<void>();

    @HostListener('scroll', ['$event'])
    onScroll(event: Event) {
        const target = event.target as HTMLElement;
        const threshold = 200; // px antes del fondo

        if (target.scrollTop + target.clientHeight >= target.scrollHeight - threshold) {
            this.scrolledToEnd.emit();
        }
    }
}
