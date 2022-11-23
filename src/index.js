'use strict';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      spaces: [],
      pastSpaces:[],
      tab: 'live',
      pageSize: 50,
    };
  }

  componentDidMount() {
    window.addEventListener("scroll", () => this.handleScroll());

    fetch('https://web3twitterspace-default-rtdb.firebaseio.com/live.json')
      .then(response => response.json())
      .then(data => {
        data = data.sort((a, b) => b.participant_count - a.participant_count);
        this.setState({spaces: data});
        console.log(data);
      });
    fetch('https://web3twitterspace-default-rtdb.firebaseio.com/past.json')
      .then(response => response.json())
      .then(data => {
        data = Object.values(data);
        data = data
          .filter((a) => a.participant_count >= 10)
          .sort((a, b) => b.participant_count - a.participant_count);
        this.setState({pastSpaces: data});
        console.log(data);
      });
  }

  render() {
    return (
      <div className="container text-center" style={{maxWidth: 598}}>
        <div className="row" style={{marginTop: 8}}>
          <h2>
            <img style={{height: 28, width: 28, verticalAlign: 'initial'}} alt="🔥" draggable="false" src="https://abs-0.twimg.com/emoji/v2/svg/1f525.svg"/> 
            <span style={{color: "white"}}> Web3 Twitter Space</span>
          </h2>
        </div>
        {this.renderTabs()}
        <div className="row tab-content" id="nav-tabContent" style={{paddingLeft: 15, paddingRight: 15, paddingBottom: 15, minHeight: 600}}>
          <div class="tab-pane fade" id="nav-past" role="tabpanel" aria-labelledby="nav-past-tab" tabindex="0">
            <div className="row">{this.state.pastSpaces.slice(0, this.state.pageSize).map((space) => this.renderSpaceCard(space, false))}</div>
          </div>
          <div class="tab-pane fade show active" id="nav-live" role="tabpanel" aria-labelledby="nav-live-tab" tabindex="0">
            <div className="row">{this.state.spaces.map((space) => this.renderSpaceCard(space, true))}</div>
          </div>
          <div class="tab-pane fade" id="nav-upcoming" role="tabpanel" aria-labelledby="nav-upcoming-tab" tabindex="0">...</div>
        </div>
        {this.renderFooter()}
        {this.renderToast()}
      </div>
    )
  }

  renderTabs() {
    return (
      <nav>
        <div class="nav nav-tabs nav-justified" id="nav-tab" role="tablist">
          <button class="nav-link" id="nav-past-tab" data-bs-toggle="tab" data-bs-target="#nav-past" type="button" role="tab" aria-controls="nav-past" aria-selected="false" style={{color: '#1DA1F2'}}>
            {'Past (' + this.state.pastSpaces.length + ')'} 
          </button>
          <button class="nav-link active" id="nav-live-tab" data-bs-toggle="tab" data-bs-target="#nav-live" type="button" role="tab" aria-controls="nav-live" aria-selected="true" style={{color: '#1DA1F2'}}>
            {'Live (' + this.state.spaces.length + ')'}
          </button>
          <button class="nav-link" id="nav-upcoming-tab" style={{color: '#1DA1F2'}} onClick={() => this.showToast()}>
            Upcoming
          </button>
        </div>
      </nav>
    )
  }

  renderSpaceCard(space, isLive) {
    return (
      <div key={space.id} className="card text-start" style={{width: 568, backgroundColor: '#1DA1F2', borderRadius: 12, padding: 11, marginBottom: 5}}>
        <div className="row" style={{paddingLeft: 11, paddingRight: 11}}>
          <div className="col col-auto" style={{padding: 0, marginRight: 4}}>
            <div style={{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
              <img style={{height: 19, width: 19, borderRadius: '50%', border: '1px solid white', objectFit: 'contain'}} src={space.creator_profile_image_url}  alt="..."/>
            </div>
          </div>
          <div className="col col-auto" style={{padding: 0, color: 'white', fontSize: 13, }}>
            <div style={{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
              <span className="card-text align-middle">{space.creator_name}</span>
            </div>
          </div>
          <div className="col col-auto" style={{color: 'white', marginLeft: 8, padding: 0}}>
            <div style={{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
              <span className="align-middle" style={{paddingLeft: 4, paddingRight: 4, borderRadius: 4, backgroundColor: 'rgba(255, 255, 255, 0.3)', fontSize: 12, fontWeight: 400}}>Host</span>
            </div>
          </div>
        </div>
        <div className="row" style={{marginTop: 8, marginBottom: 8}}>
          <span style={{fontSize: 19, fontWeight: 800, color: 'white'}}>{space.title}</span>
        </div>
        <div className="row">
          <p className="card-text" style={{color: 'white', fontSize: 13}}>{space.participant_count} in this space</p>  
        </div>
        <div className="row" style={{paddingLeft: 12, paddingRight: 12}}>
          <div 
            style={{height: 32, marginTop: 15, backgroundColor: 'rgb(239, 243, 244)', minWidth: 34, borderRadius: '9999px', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', cursor: 'pointer'}}
            onClick={() => this.goToSpace(space.id)}> 
           <span style={{fontSize: 14, fontWeight: 700}}>{isLive ? 'Listen live' : 'Go to Space'}</span>
          </div>
        </div>
      </div>
    )
  }

  renderFooter() {
    return (
      <div className="row row-cols-auto" style={{color: 'white', paddingLeft: 15, paddingRight: 15, marginBottom: 15}}>
          <div className="col" onClick={() => window.open('https://www.privacypolicygenerator.info/live.php?token=4fclxBeWggIPSSnIp0flCgPXY0nQGdcu', '_blank')}>Privacy Policy</div>
          <div className="col" onClick={() => window.open('https://www.termsandconditionsgenerator.com/live.php?token=kWY9pYLJmCUPGMXxH5S2elpC35R4c1bU', '_blank')}>Terms and Conditions</div>
          <div className="col">@ 2022 twitterspace.co; All rights reserved</div>
      </div>
    )
  }

  renderToast() {
    return (
      <div className="toast-container position-fixed bottom-0 end-0 p-3">
        <div id="liveToast" className="toast" role="alert align-items-center" aria-live="assertive" aria-atomic="true">
          <div className="d-flex">
            <div className="toast-body">
              This feature will be coming soon!
            </div>
            <button type="button" className="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
        </div>
      </div>
    )
  }

  goToSpace(spaceId) {
    window.open('https://twitter.com/i/spaces/'+spaceId, '_blank');
  }

  showToast() {
    const toastLiveExample = document.getElementById('liveToast');
    const toast = new bootstrap.Toast(toastLiveExample);
    toast.show();
  }

  handleScroll() {
    let userScrollHeight = window.innerHeight + window.scrollY;
    let windowBottomHeight = document.documentElement.offsetHeight;

    if (userScrollHeight >= windowBottomHeight) {
      this.setState((prevState, props) => ({pageSize: prevState.pageSize + 50}));
    }
  }
}

let domContainer = document.querySelector('#react_container');
ReactDOM.render(<Main />, domContainer);