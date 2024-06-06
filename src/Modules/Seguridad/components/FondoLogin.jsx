import React, { useRef, useEffect } from "react";
import "../style/FondoLogin.css";

function FondoLogin() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const cw = (canvas.width = 500);
    const cx = cw / 2;
    const ch = (canvas.height = 500);
    const cy = (3 * ch) / 4;

    const rad = Math.PI / 180;
    let frames = 0;
    const spring = 0.005; //elasticidad
    const leafColors = ["#5a9435", "#76ae3e"];
    const heartsRy = [];
    ctx.font = "35pt Tangerine";
    ctx.strokeStyle = "hsl(19,98%,45%)";
    ctx.textAlign = "center";

    // BRANCH
    const bez = {
      x: 0,
      y: cy,
      cx: cx,
      cy: cy,
      _x: cw - 50,
      _y: cy,
      dest_y: cy + 20,
      speed: 0,
    };
    const bez1 = {
      _x: 0,
      _y: cy + 20,
      cx: cx,
      cy: cy + 15,
      x: cw - 50,
      y: cy + 10,
      dest_y: cy + 30,
      speed: 0,
    };

    function pointOnQuadraticBezier(bez, t) {
      const o = {};
      o.x =
        (1 - t) * (1 - t) * bez.x + 2 * (1 - t) * t * bez.cx + t * t * bez._x;
      o.y =
        (1 - t) * (1 - t) * bez.y + 2 * (1 - t) * t * bez.cy + t * t * bez._y;
      return o;
    }

    function Leaf(x, y, r, a) {
      this.r = r;
      this.a = a;
      this.x = x + this.r * Math.cos(this.a);
      this.y = y + this.r * Math.sin(this.a);
      this.R = Math.sqrt(2 * this.r * this.r);
      this.a1 = this.a + Math.PI / 2;
      this.a2 = this.a1 + Math.PI;
      this.from_a = this.a - 45 * rad;
      this.to_a = -90 * rad + this.from_a;
      this.x1 = this.x + this.r * Math.cos(this.a1);
      this.y1 = this.y + this.r * Math.sin(this.a1);
      this.x2 = this.x + this.r * Math.cos(this.a2);
      this.y2 = this.y + this.r * Math.sin(this.a2);
    }

    function drawLeaf(l, leafColors) {
      ctx.save();
      ctx.fillStyle = leafColors[0];
      ctx.beginPath();
      ctx.arc(l.x1, l.y1, l.R, l.from_a, l.to_a, true);
      ctx.fill();
      ctx.fillStyle = leafColors[1];
      ctx.beginPath();
      ctx.arc(l.x2, l.y2, l.R, Math.PI + l.from_a, Math.PI + l.to_a, true);
      ctx.fill();
      ctx.restore();
    }

    function drawBranch(bez, bez1) {
      ctx.beginPath();
      ctx.moveTo(bez.x, bez.y); // aquí empieza la curva
      ctx.quadraticCurveTo(bez.cx, bez.cy, bez._x, bez._y);
      ctx.lineTo(bez1.x, bez1.y); // aquí empieza la curva
      ctx.quadraticCurveTo(bez1.cx, bez1.cy, bez1._x, bez1._y);
      ctx.fill();
    }

    function drawTwig(l, dx, dy, size, angle) {
      const x = l.x;
      const y = l.y;
      const _x = x + dx;
      const _y = y + dy;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(_x, _y);
      ctx.stroke();
      const lx = l.x + dx;
      const ly = l.y + dy;
      const leaf = new Leaf(lx, ly, size, angle * rad);
      drawLeaf(leaf, leafColors);
    }

    function Bird(R, poz, color) {
      this.R = R;
      this.x = poz.x;
      this.y = poz.y - this.R;
      this.color = color;
    }

    function DrawBird(R, t, hue, light) {
      const color = `hsl(${hue},${light}%,70%)`;
      const tuftColors = [
        `hsl(${hue},${light}%,60%)`,
        `hsl(${hue},${light}%,50%)`,
      ];
      ctx.strokeStyle = "hsl(31,40%,25%)";
      const poz = pointOnQuadraticBezier(bez, t);
      const bird = new Bird(R, poz, color);
      // TAIL
      ctx.fillStyle = `hsl(${hue},${light}%,50%)`;
      ctx.beginPath();
      ctx.moveTo(bird.x, bird.y + 0.5 * bird.R);
      ctx.lineTo(bird.x - 1.1 * bird.R, bird.y + 0.3 * bird.R);
      ctx.lineTo(bird.x - 1.2 * bird.R, bird.y + 0.7 * bird.R);
      ctx.closePath();
      ctx.fill();
      // BODY
      ctx.fillStyle = bird.color;
      ctx.beginPath();
      ctx.arc(bird.x, bird.y, bird.R, 0, 2 * Math.PI);
      ctx.fill();
      //EYES
      const x1 = bird.x + 21 * Math.cos(-165 * rad);
      const x2 = bird.x + 21 * Math.cos(-15 * rad);
      const y1 = bird.y + 21 * Math.sin(-165 * rad);
      const y2 = bird.y + 21 * Math.sin(-15 * rad);
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.arc(x1, y1, 20, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(x2, y2, 20, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "black";
      ctx.beginPath();
      ctx.arc(x1 + 5, y1 + 5, 10, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(x2 - 5, y2 + 5, 10, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
      // BEAK
      ctx.fillStyle = "darkorange";
      ctx.beginPath();
      ctx.moveTo(bird.x, bird.y);
      ctx.lineTo(bird.x + 7, bird.y + 10);
      ctx.lineTo(bird.x, bird.y + 20);
      ctx.lineTo(bird.x - 7, bird.y + 10);
      ctx.closePath();
      ctx.fill();
      // LEGS
      const leg1 = pointOnQuadraticBezier(bez, t + 0.02);
      ctx.beginPath();
      ctx.arc(leg1.x, leg1.y, 6, 0, 2 * Math.PI);
      ctx.fill();
      const leg2 = pointOnQuadraticBezier(bez, t - 0.02);
      ctx.beginPath();
      ctx.arc(leg2.x, leg2.y, 6, 0, 2 * Math.PI);
      ctx.fill();
      //TUFT
      const tuft = new Leaf(bird.x, bird.y - bird.R, 15, -20 * rad);
      drawLeaf(tuft, tuftColors);
      const tuft1 = new Leaf(bird.x, bird.y - bird.R, 10, -80 * rad);
      drawLeaf(tuft1, tuftColors);
    }

    function Heart() {
      this.x = cw / 2;
      this.y = (3 * ch) / 4;
      this.r = 5;
      this.a = -90;
      this.lightness = 50;
      this.pn = Math.random() > 0.5 ? 1 : -1;
      this.fall = Math.round(Math.random() * 7) + 1;
      this.drift = this.pn * Math.round(Math.random() * 4) + 1;
    }

    Heart.prototype.draw = function () {
      const x = this.x;
      const y = this.y;
      const r = this.r;
      const a = this.a;
      ctx.fillStyle = `hsl(0,95%,${this.lightness}%)`;
      ctx.beginPath();
      const x1 = x + r * Math.cos(a * rad);
      const y1 = y + r * Math.sin(a * rad);
      const cx1 = x + r * Math.cos((a + 22.5) * rad);
      const cy1 = y + r * Math.sin((a + 22.5) * rad);

      const cx2 = x + r * Math.cos((a - 22.5) * rad);
      const cy2 = y + r * Math.sin((a - 22.5) * rad);
      const chord = 2 * r * Math.sin((22.5 * rad) / 2);

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.arc(cx1, cy1, chord, (270 + a) * rad, (270 + a + 225) * rad);
      ctx.lineTo(x, y);
      ctx.moveTo(x1, y1);
      ctx.arc(cx2, cy2, chord, (90 + a) * rad, (90 + a + 135) * rad, true);
      ctx.lineTo(x, y);
      ctx.fill();
    };

    function heartsAnimation() {
      if (heartsRy.length < 20 && frames % 5 === 0) {
        const heart = new Heart();
        heartsRy.push(heart);
      }
      for (let i = 0; i < heartsRy.length; i++) {
        if (heartsRy[i].lightness >= 100) {
          heartsRy[i].y = (3 * ch) / 4;
          heartsRy[i].x = cw / 2;
          heartsRy[i].fall = Math.round(Math.random() * 7) + 1;
          heartsRy[i].drift =
            heartsRy[i].pn * Math.round(Math.random() * 4) + 1;
          heartsRy[i].lightness = 50;
          heartsRy[i].r = 5;
        }
        heartsRy[i].y -= heartsRy[i].fall;
        heartsRy[i].fall -= 0.1;
        heartsRy[i].x += heartsRy[i].drift;
        heartsRy[i].lightness++;
        heartsRy[i].r += 0.2;
        heartsRy[i].draw();
      }
    }

    function Animacion() {
      window.requestAnimationFrame(Animacion);
      frames++;
      ctx.clearRect(0, 0, cw, ch);

      ctx.fillStyle = "#777";
      ctx.fillText("Mi Pequeño", cx, 60);
      ctx.fillText("Mundo", cx, 120);

      heartsAnimation();

      /////////////////////////////
      const dist = bez.dest_y - bez._y;
      const acc = dist * spring;
      bez.speed += acc;
      bez._y += bez.speed;

      const dist1 = bez1.dest_y - bez1.y;
      const acc1 = dist1 * spring;
      bez1.speed += acc1;
      bez1.y += bez1.speed;
      ////////////////////////////

      ctx.fillStyle = "hsl(31,40%,25%)";

      drawBranch(bez, bez1);
      drawTwig(pointOnQuadraticBezier(bez1, 0.3), 30, 20, 30, 60);
      drawTwig(pointOnQuadraticBezier(bez1, 0.3), 15, 10, 20, 80);
      drawTwig(pointOnQuadraticBezier(bez1, 0.6), 20, 10, 20, 30);
      drawTwig(pointOnQuadraticBezier(bez, 0.9), 10, -20, 20, -30);
      drawTwig(pointOnQuadraticBezier(bez, 0.9), 5, -10, 20, -70);

      DrawBird(50, 0.26, 180, 50);
      DrawBird(60, 0.52, 0, 50);
      DrawBird(55, 0.8, 42, 95);
    }

    window.requestAnimationFrame(Animacion);
  }, []);

  return <canvas id="c" ref={canvasRef}></canvas>;
}

export default FondoLogin;
