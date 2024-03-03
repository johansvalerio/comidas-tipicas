"use client"
 //import { DELETE as deleteUser } from "@/app/api/users/[id]/route"
 import { useRouter } from "next/navigation"
export default function DeleteButton({user_id}: { user_id: number }) {

    const router = useRouter()

    const onClick = (async ({user_id}: { user_id: number }) => {
        console.log(user_id)
        const res = await fetch(`/api/users/${user_id}`, {
            method: 'DELETE',
            body: JSON.stringify({
                user_id: user_id
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            
        })
        const resJSON = await res.json()
        .then(() => router.refresh())
        //.finally(() => router.replace('/'))
        console.log(resJSON)
    })

    return (
        <button
            onClick={() => onClick({user_id})}
            className="bg-rose-500 w-full p-2 text-sm font-medium rounded-md">
            Delete
        </button>
    )
}

