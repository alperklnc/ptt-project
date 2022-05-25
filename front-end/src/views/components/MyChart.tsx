import graph1 from '../../testplot1.png';
import graph2 from '../../testplot2.png';

export default function App() {
  function getFirstImage() {
      return <img src={graph1} />
  }

  function getImage(){
    var image = getFirstImage();
    if(image.props["src"] == "data:image/png;base64,"){
      return <img src={graph2} />
    }
    return image;
  }

  return (<div>
    {getImage()}
    
    </div>);
  }