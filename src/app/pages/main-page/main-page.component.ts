import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent implements AfterViewInit {
  innerWidth:number = 0
  showIcons:boolean = true

  @ViewChild("icon") icon!: ElementRef<HTMLAnchorElement>;
  @ViewChild("web") web!: ElementRef<HTMLAnchorElement>;
  @ViewChild("java") java!: ElementRef<HTMLAnchorElement>;

  ngAfterViewInit(): void {
    this.onResize()
    this.updateIcon()
  }

  updateIcon():void {
    this.icon.nativeElement.style.display = 'none'
    console.log(this.innerWidth)
    /*this.icon.style.display = this.innerWidth>=768 ? 'block' : 'none'*/
  }

  @HostListener('window:resize')
  onResize() {
    if (typeof window !== 'undefined') {
      this.innerWidth = window.innerWidth // ERROR/TODO RETURNING 0
    }
    this.updateIcon()
  }
}
