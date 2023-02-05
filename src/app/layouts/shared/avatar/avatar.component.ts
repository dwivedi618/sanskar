import { Component, Input, OnInit } from '@angular/core';
export type Size = 'sm' | 'lg' | 'md' | 'xl';
export type Gender = 'male' | 'female' | 'other';
export type Shape = 'circle' | 'square';
@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent {
  @Input() public gender: Gender = 'male'
  @Input() public src: string = '';
  @Input() public size: Size = 'md';
  @Input() public shape: Shape = 'circle';
  @Input() public age: number = 14;

  public get imgSrc(): string {
    // return this.src || (this.gender ? `assets/user_profiles/${this.gender.toLocaleLowerCase()}.png` : `assets/user_profiles/user.svg`)
    return this.src || (this.gender ? `assets/user_profiles/user.svg` : `assets/user_profiles/user.svg`)

  }
}
