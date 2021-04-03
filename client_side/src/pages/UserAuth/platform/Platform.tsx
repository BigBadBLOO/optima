//core
import React from 'react'
import {useQuery} from "@apollo/client";
import {Link} from "react-router-dom";

//components
import GlobalLoader from "@components/Loaders/GlobaLoader";
import Header from "@components/userAuth/PageHeader/Header";

//requests
import User from "@gql/user.gql";
import AgencyLidgen from "@pages/UserAuth/platform/typePlatform/AgencyLidgen/AgencyLidgen";

type PlatformType = {
  match: {
    params: {
      platformId?: string | undefined,
      page?: string | undefined
    }
    isExact: boolean;
    path: string;
    url: string;
  }
}

const Platform: React.FC<PlatformType> = ({match}) => {

  const idPlatform = match.params.platformId
  const activePage = match.params.page

  const {loading, error, data} = useQuery(User);

  if (loading) return <GlobalLoader/>



  if (!idPlatform) {
    const root_dir_jsx = !platform && <div>{data.getCurrentUser.platforms.map(platform => {
      return <Link key={platform.id} to={'/platforms/' + platform.platformName}>
        <p className="m-2">Войти на платформу с id {platform.id} и названием {platform.platformName}
        </p>
      </Link>
    })}
    </div>

    return (
      <div>
        <Header/>
        {root_dir_jsx}
      </div>
    )
  }
  const platform = data.getCurrentUser.platforms.find(platform => platform.platformName === idPlatform)
  if (!platform)  return <div> Вам надо авторизоваться</div>

  if (platform.type === 'AgencyLidgen') return <AgencyLidgen pathToPlatform={'/platforms/' + platform.platformName} activePage={activePage}/>

  return  <div>Платформы не существует</div>
}

export default Platform