//core
import React from "react";

//component
import LandingHeader from "@components/userNotAuth/PageHeader";
import PageFooter from "@components/userNotAuth/PageFooter";


const LandingPage: React.FC = () => {

    const refToPossibility = React.createRef();
    const refToTariff = React.createRef();
    const refToModules = React.createRef();

    return (
        <div className="bg-white">
            <LandingHeader
                refToPossibility={refToPossibility}
                refToTariff={refToTariff}
                refToModules={refToModules}
            />
            {/*<LandingBody*/}
            {/*    refToPossibility={refToPossibility}*/}
            {/*    refToTariff={refToTariff}*/}
            {/*    refToModules={refToModules}*/}
            {/*/>*/}
            <PageFooter/>
        </div>
    )
}

export default LandingPage
