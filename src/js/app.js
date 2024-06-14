//node_modules에서 제공하는 라이브러리 
import React from 'react'
import ReactDOM from 'react-dom'
import Web3 from 'web3'
import TruffleContract from 'truffle-contract'

import Election from '../../build/contracts/Election.json' // < Election.json 파일 읽기>
import Content from './Content'
import 'bootstrap/dist/css/bootstrap.css'

class App extends React.Component {

  constructor(props) {
    //component state 사용 (to manage our app state)
    super(props)
    this.state = {
      account: '0x0',
      candidates: [],
      hasVoted: false,
      loading: true,
      voting: false,
    }

    //web3 설정 (react <-> blockchain)
    if (typeof web3 != 'undefined') {
      this.web3Provider = web3.currentProvider
    } else {
      this.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545')
    }

    this.web3 = new Web3(this.web3Provider)

    this.election = TruffleContract(Election) // 중요한 부분!! <generating truffle contract that we can use to interact with>
    //컨트랙트와 FE의 연동을 위해 많은 사람들이 web3를 그 자체로 사용하지만, 별로 선호하지 않는다. 아래 이유
    //1. keep setting the address based on environment
    //2. keep changing the ABI* while you're developing
    //* ABI = abstract binary interface (generate a contract for EVM, Web3와 같은 FE, truffle contract)
    this.election.setProvider(this.web3Provider)

    //binding functions
    this.castVote = this.castVote.bind(this)
    this.watchEvents = this.watchEvents.bind(this)
  }

  //blockchain data state와 연동, componentDidMount() = did this component mount and if it did do this stuff
  componentDidMount() {
    // TODO: Refactor with promise chain
    this.web3.eth.getCoinbase((err, account) => {
      this.setState({ account })
      this.election.deployed().then((electionInstance) => {
        this.electionInstance = electionInstance
        this.watchEvents()
        this.electionInstance.candidatesCount().then((candidatesCount) => {
          for (var i = 1; i <= candidatesCount; i++) {
            this.electionInstance.candidates(i).then((candidate) => {
              const candidates = [...this.state.candidates]
              candidates.push({
                id: candidate[0],
                name: candidate[1],
                voteCount: candidate[2]
              });
              this.setState({ candidates: candidates })
            });
          }
        })
        this.electionInstance.voters(this.state.account).then((hasVoted) => {
          this.setState({ hasVoted, loading: false })
        })
      })
    })
  }

  watchEvents() {
    // TODO: trigger event when vote is counted, not when component renders
    this.electionInstance.votedEvent({}, {
      fromBlock: 0,
      toBlock: 'latest'
    }).watch((error, event) => {
      this.setState({ voting: false })
    })
  }

  castVote(candidateId) {
    this.setState({ voting: true })
    this.electionInstance.vote(candidateId, { from: this.state.account }).then((result) =>
      this.setState({ hasVoted: true })
    )
  }

  //everytime the state changes react rerenders
  render() {
    return (
      <div class= 'row justify-content-center align-items-center' style={{ minHeight: '100vh' }}>
        <div class='col-lg-12 text-center' >
        <h1>선거1</h1>
        <br/> 
        { this.state.loading 
            ? (
              <div className="text-center">
                  <p>로딩중...</p>
                  <p>메타마스크의 계정과 네트워크 연결 상태를 확인해주세요.</p>
              </div>
            )
            : this.state.voting
              ? (
                <div className="text-center">
                    <p>투표중...</p>
                    <p>가스 비용 컨펌 후 페이지를 새로 고침해주세요.</p>
                    <p>투표 취소를 원하면 페이지를 새로 고침해주세요.</p>
                </div>
              )
              : <Content
                account={this.state.account}
                candidates={this.state.candidates}
                hasVoted={this.state.hasVoted}
                castVote={this.castVote} />
}

        </div>
      </div>
    )
  }
}

ReactDOM.render(
   <App />,
   document.querySelector('#root')
)