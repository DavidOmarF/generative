function getDisplacement(radius, angle) {
  return {
    x: radius * Math.cos(angle),
    y: radius * Math.sin(angle)
  }
}

function getPoints(center, radius, numberOfPoints) {
  let points = [];

  let step = (Math.PI * 2) / numberOfPoints;

  for (let i = 0; i < numberOfPoints; i++) {
    let d = getDisplacement(radius, step * i)
    points.push({
      x: center.x + d.x,
      y: center.y + d.y
    });
  }

  return points;
}

function LandMass(points) {
  this.points = points;
  this.history = [this.points];
  this.last = this.history[this.history.length - 1];

  this.update = function () {
    let newLandMass = []
    let step = (Math.PI * 2) / this.points.length;
    for (let i = 0; i < points.length; i++) {
      let d = getDisplacement(randomGaussian(0, 1) * points[0].y / 600, (Math.PI * 2) * random());
      newLandMass.push({
        x: this.points[i].x + d.x,
        y: this.points[i].y + d.y
      })
    }
    this.points = newLandMass
    this.history.push(newLandMass);
    if (this.history.length > 1) {
      this.history.splice(0, 1);
    }

  }

  this.show = function () {
    noFill();
    beginShape();
    let mainAlpha = random(0,1);
    stroke('rgba(0,0,0,'+mainAlpha+')')
    strokeWeight(.3);
    for (var i = 0; i < this.points.length; i++) {
      var pos = this.points[i];
      vertex(pos.x, pos.y);
    }
    endShape(CLOSE);

    for (var j = 0; j < this.history.length; j++) {
      let currentMass = this.history[j]
      stroke('rgba(0, 0, 0,'+ mainAlpha * i / this.history.length +')');
      beginShape();
      for (var i = 0; i < currentMass.length; i++) {
        var pos = currentMass[i];
        vertex(pos.x, pos.y);
      }
      endShape(CLOSE);

    }

  }
}