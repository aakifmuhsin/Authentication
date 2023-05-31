import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
    pageTitle: string = 'Hi, This is Aakif Muhsin. Welcome to My Page';
    pageContent: string = "I'm excited to share my work with you and showcase my skills as a fresh graduate in the Information Technology. With a passion for Web Development, I am eager to contribute my creativity and technical abilities to make a positive impact in the digital world.Throughout my studies, I have gained a solid foundation in Angular, React,Bootstrap,Laravel . I have worked on various projects, both individually and as part of a team, to develop my abilities and learn from real-world challenges. My portfolio highlights some of my best work, demonstrating my dedication to producing visually appealing and functional Angular Application.I have a keen eye for detail and strive to create user-friendly experiences. I believe that a well-designed website not only looks great but also serves its purpose effectively. I am continuously learning and staying up-to-date with the latest industry trends and best practices to deliver modern and engaging solutions.Collaboration and effective communication are key aspects of my work. I enjoy working with others, sharing ideas, and learning from their experiences. I value feedback and constantly seek opportunities to improve my skills and grow as a professional.Thank you for visiting my web portfolio and taking the time to explore my work. I hope it gives you a glimpse of my abilities and potential. Feel free to reach out to me with any questions or opportunities to collaborate.";
  

}
