/**
 * Custom hook serving as an in-component route guard to only allow users with valid tokens
 */

import { useEffect, useState } from "react";
import { tokenStorage } from "../util/StorageUtil";
import { useNavigate, useParams } from "react-router";
import { API_URL } from "../constants/api";

export function useRoomGuard(): boolean {

    const [ok, setOk] = useState(false);
    let { room } = useParams()
    const navigate = useNavigate();

    useEffect(() => {
        const token = tokenStorage.getValue();

        // ensure token exists
        if (!token) {
            navigate(`/join?room=${room}`)
        }

        fetch(`${API_URL}/auth/validate/${room}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then((res) => {
            if (![401, 403].includes(res.statusCode)) {
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