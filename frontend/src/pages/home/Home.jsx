import React from "react";
import Banner from "./Banner";
import TopSellers from "./TopSellers";
import Recommend from "./Recommend";
import News from "./News";
export default function Home(){
    return(
        <>
            <Banner/>
            <TopSellers/>
            <Recommend/>
            <News/>
        </>
    )
}