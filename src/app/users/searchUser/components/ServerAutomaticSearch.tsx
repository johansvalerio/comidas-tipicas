import ClientAutomaticSearch from './ClientAutomaticSearch'
// import {GET} from '@/app/api/users/route'
export default async function ServerAutomaticSearch() {
    // const res = await GET()
    // const users: Users = await res.json()
  return (
    <div>
      {/* <ClientAutomaticSearch users={users} /> */}
      <ClientAutomaticSearch/>
    </div>
  )
}
