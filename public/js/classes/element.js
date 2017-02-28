var DIRECTION = {
  "TOP"   : 0,
  "RIGHT" : 1,
  "BOTTOM": 2,
  "LEFT"  : 3
}

Element = function(name, x, y, width, height, map) {
  this.map = map
  let self = this
  this.width = parseInt(width)
  this.height = parseInt(height)
  this.x = x
  this.y = y
  this.image = new Image()
  $.getJSON('/assets/json/elements/' + name + '.json', (data) => {
    self.imageWidth = data.width
    self.imageHeight = data.height
    self.type = data.type
    self.hitboxes = data.hitboxes
    self.correctRatio()
    self.image.src = "/assets/svg/elements/" + data.image
    self.image.onload = function() {
      self.draw(map.getElCtx())
    }
  })
}

Element.prototype.draw = function(context) {
  context.drawImage(this.image, this.x, this.y, this.width, this.height)
}

Element.prototype.correctRatio = () => {
  if ((this.width / this.height) != (this.imageWidth / this.imageHeight)){
    this.height = this.width * (this.imageWidth / this.imageHeight)
  }
}

Element.prototype.collision = (other) => {
  if (other.isPrototypeOf(Element) === false || other.isPrototypeOf(Character) === false)
    throw Error("Impossible de gérer des collisions avec autre chose que des éléments")
}