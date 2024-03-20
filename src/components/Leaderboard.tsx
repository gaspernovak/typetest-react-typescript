import styled from 'styled-components'
import { useState } from 'react'

const LeaderboardWrapper = styled.section`
`
const Table = styled.table`
    width: 100%;
`

interface Score {
    username: string;
    date: Date;
    wpm: number;
}

const Leaderboard = () => {
    const [scores, setScores] = useState<Score[]>([
        {username: "johndoe", date: new Date(), wpm: 77},
        {username: "doejohn", date: new Date(), wpm: 88}
    ])
    setScores
    return (
        <LeaderboardWrapper>
            <h3>Leaderboard</h3>
            <Table>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">name</th>
                        <th scope="col">date</th>
                        <th scope="col">wpm</th>
                    </tr>
                </thead>
                <tbody>
                    {scores &&
                        scores.map((item, key) => (
                            <tr key={key}>
                                <th scope="row">{key}</th>
                                <td>{item.username}</td>
                                <td>{item.date.toLocaleDateString()}</td>
                                <td>{item.wpm}</td>
                            </tr>
                        ))}
                </tbody>
            </Table>
        </LeaderboardWrapper>
    )
}

export default Leaderboard