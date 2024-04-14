import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  getProjects() {
    return {
      java: [
          {
              name: "Simple chat",
              description: "A simple multi-client chat",
              img_name: "simple_chat.png",
              link: "https://github.com/RafaelSaesPalaria/simpleChat"
          },
          {
              name: "Bomb Runner",
              description: "Clear the area while avoiding stepping on the bombs.",
              img_name: "bomb_runner.png",
              link: "https://github.com/RafaelSaesPalaria/BombRunner"
          }
      ],
      web: [
          {
              name: "Quick Canvas",
              description: "A Chrome Extension for downloading canvas",
              img_name: "quick_canvas.png",
              link: "https://chromewebstore.google.com/detail/quick-canvas/fdlclenmhidfmdekcbiolbimnkdfemde"
          },
          {
              name: "Web Chat",
              description: "A Web server with a chat",
              img_name: "web_chat.png",
              link: "https://github.com/RafaelSaesPalaria/webChat"
          },
          {
              name: "Ball Runner",
              description: "Don't let the blue balls touch you",
              img_name: "ball_runner.png",
              link: "../../projects/ballrunner/"
          }
      ]
  };
}
}