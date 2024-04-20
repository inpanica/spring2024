import { useEffect } from "react";
import Card from "../card/Card";
import { inviteAccept } from "../../actions";

function Autoinvite({invite, ...props }) {

    useEffect(() => {
        const autoinv = async () =>{
            const response = await inviteAccept(invite.id_u, invite.team.id_t)
            console.log(response);
        }
        autoinv()
    })

    return (
        <Card>  
            
        </Card>
    )
}

export default Autoinvite