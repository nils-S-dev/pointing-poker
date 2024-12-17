/**
 * Custom hook serving as an in-component route guard to only allow users with valid tokens
 */

import { useEffect, useState } from "react";
import { tokenStorage } from "../util/StorageUtil";
import { useNavigate, useParams } from "react-router";

export function useRoomGuard(): boolean {

    const [ok, setOk] = useState(false);
    let { room } = useParams()
    const navigate = useNavigate();

    useEffect(() => {
        const token = tokenStorage.get();

        /** Custom Implementation of Something an in-component-route-guard would be  */
    
        // ensure token exists
        if (!token) {
            navigate(`/join?room=${room}`)
        }

        /** Custom Implementation of Something an in-component-route-guard would be  */
        /**  @TODO make this guard a hook **/
        fetch("http://localhost:3000/auth/validate", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then((res) => {
            if (res.statusCode !== 401) {
                return setOk(true);
            }
            navigate(`/join?room=${room}`)
        })
        .catch(err => {
            console.error(err);
            navigate(`/join?room=${room}`)
        })
    }, [])

    return ok;
}