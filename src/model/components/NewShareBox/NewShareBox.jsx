import "./newShareBox.css"
import { IoShareOutline, } from "react-icons/io5";
// import { RWebShare } from "react-web-share";
import { FiShare2 } from "react-icons/fi";


export function NewShareBox({idProperty, title}) {
    return (
      <div className="buttonShareBox">
      {/* <RWebShare
        data={{
          text: `${title}`,
          url: `https://www.suachave.com.br/imovel/${idProperty}`,
          title: `${title}`,
        }}
        onClick={() => console.log("shared successfully!")}
      >
       <FiShare2 />
      </RWebShare> */}
      </div>

    )
}
