import Card from "./Card"
export default function UsersDashboard() {
    return (
        <div className="w-full h-screen">
            <div className= "px-24 py-5">
                <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            </div>

            <div className= "px-24 py-5">
                <Card />
            </div>

        </div>
    )
}
