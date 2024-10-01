import React, { Component } from "react";

class ImageResizer extends Component {
  constructor(props) {
    super(props);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);

    this.state = {
      width: 300, // initial width
      height: 300, // initial height
      isResizing: false,
      startX: 0,
      startY: 0,
    };
  }

  handleMouseDown(event) {
    this.setState({
      isResizing: true,
      startX: event.clientX,
      startY: event.clientY,
    });

    window.addEventListener("mousemove", this.handleMouseMove);
    window.addEventListener("mouseup", this.handleMouseUp);
  }

  handleMouseMove(event) {
    if (this.state.isResizing) {
      const { startX, startY } = this.state;
      const newWidth = this.state.width + (event.clientX - startX);
      const newHeight = this.state.height + (event.clientY - startY);

      this.setState({
        width: newWidth > 0 ? newWidth : 0,
        height: newHeight > 0 ? newHeight : 0,
        startX: event.clientX,
        startY: event.clientY,
      });
    }
  }

  handleMouseUp() {
    this.setState({ isResizing: false });
    window.removeEventListener("mousemove", this.handleMouseMove);
    window.removeEventListener("mouseup", this.handleMouseUp);
  }

  render() {
    const { width, height } = this.state;
    const { imageUrl } = this.props; // Image URL passed from parent component

    return (
      <div
        style={{
          display: "inline-block",
          position: "relative",
          cursor: "nwse-resize",
        }}
        onMouseDown={this.handleMouseDown}
      >
        <img
          src={imageUrl}
          alt=""
          style={{
            width: width,
            height: height,
            objectFit: "contain",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: "10px",
            height: "10px",
            backgroundColor: "blue",
            cursor: "nwse-resize",
          }}
        ></div>
      </div>
    );
  }
}

export default ImageResizer;
