import "./newShare.css"
import { IoShareOutline, } from "react-icons/io5";
// import { RWebShare } from "react-web-share";


export function NewShare({idProperty, title}) {
    return (
        <>
      {/* <RWebShare
        data={{
          text: `${title}`,
          url: `https://www.suachave.com.br/imovel/${idProperty}`,
          title: `${title}`,
        }}
        onClick={() => console.log("shared successfully!")}
      >
        <button className="buttonShare" ><IoShareOutline /> Compartilhar</button>
      </RWebShare> */}

        </>
    )
}
