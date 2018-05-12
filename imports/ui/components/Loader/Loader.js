// Node Modules
import React from 'react';

class Loader extends React.Component {
  render() {
    let { config: { type, color }, className } = this.props;

    switch (type)
    {
      case 'circle':
        return (
          <div className={`${"skCircle"} ${className}`}>
            <div className={`${"skCircle1"} ${"skChild"}`}></div>
            <div className={`${"skCircle2"} ${"skChild"}`}></div>
            <div className={`${"skCircle3"} ${"skChild"}`}></div>
            <div className={`${"skCircle4"} ${"skChild"}`}></div>
            <div className={`${"skCircle5"} ${"skChild"}`}></div>
            <div className={`${"skCircle6"} ${"skChild"}`}></div>
            <div className={`${"skCircle7"} ${"skChild"}`}></div>
            <div className={`${"skCircle8"} ${"skChild"}`}></div>
            <div className={`${"skCircle9"} ${"skChild"}`}></div>
            <div className={`${"skCircle10"} ${"skChild"}`}></div>
            <div className={`${"skCircle11"} ${"skChild"}`}></div>
            <div className={`${"skCircle12"} ${"skChild"}`}></div>
          </div>
        );
        break;
      case 'spinner':
      default:
        return (
          <div className={`${"spinner"} ${className}`}>
            <div className={"bounce1"} style={{backgroundColor: color}}></div>
            <div className={"bounce2"} style={{backgroundColor: color}}></div>
            <div className={"bounce3"} style={{backgroundColor: color}}></div>
          </div>
        );
        break;
    }
  }
}

export default Loader;
