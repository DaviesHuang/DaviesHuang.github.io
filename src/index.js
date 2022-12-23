'use strict';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      spaces: [],
      pastSpaces:[],
      upcomingSpaces: [],
      tab: 'live',
      pageSize: 50,
      searchKeyword: "",
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
          <div className="tab-pane fade" id="nav-past" role="tabpanel" aria-labelledby="nav-past-tab" tabIndex="0">
            {this.renderSpaceList()}
          </div>
          <div className="tab-pane fade show active" id="nav-live" role="tabpanel" aria-labelledby="nav-live-tab" tabIndex="0">
            {this.renderSpaceList()}
          </div>
          <div className="tab-pane fade" id="nav-upcoming" role="tabpanel" aria-labelledby="nav-upcoming-tab" tabIndex="0">
            {this.renderSpaceList()}
          </div>
        </div>
        {this.renderFooter()}
        {this.renderToast()}
      </div>
    )
  }

  renderTabs() {
    return (
      <nav>
        <div className="row" id="nav-tab" role="tablist" style={{paddingLeft: 15, paddingRight: 15}}>
          <div>
            <div className="row justify-content-start">
              <div className="col-12" style={{paddingLeft: 0, paddingRight: 0}}>
                <input className="form-control me-2" type="search" placeholder="Search spaces" aria-label="Search" 
                  onFocus={() => mixpanel.track("Click search bar")}
                  onChange={(e) => this.searchSpace(e)}/>
              </div>
              {/* {this.renderLanguageSelector()} */}
              <div className="col-auto" style={{padding: 0, marginTop: 5, marginRight: 10, marginBottom: 5}}>
                <button className="btn" id="nav-past-tab" data-bs-toggle="tab" data-bs-target="#nav-past" type="button" role="tab" aria-controls="nav-past" aria-selected="false" 
                    style={this.state.tab === 'past' ? Style.tabButtonSelected : Style.tabButton}
                    onClick={() => this.clickTab("past")}>
                    {'Past (6000+)'} 
                </button>
              </div>
              <div className="col-auto" style={{padding: 0, marginTop: 5, marginRight: 10, marginBottom: 5}}>
                <button className="btn col-4 active" id="nav-live-tab" data-bs-toggle="tab" data-bs-target="#nav-live" type="button" role="tab" aria-controls="nav-live" aria-selected="true" 
                    style={this.state.tab === 'live' ? Style.tabButtonSelected : Style.tabButton}                    
                    onClick={() => this.clickTab("live")}>
                    {'Live (' + this.state.spaces.length + ')'}
                </button>
              </div>
              <div className="col-auto" style={{padding: 0, marginTop: 5, marginRight: 10, marginBottom: 5}}>
                <button className="btn col-4" id="nav-upcoming-tab" data-bs-toggle="tab" data-bs-target="#nav-upcoming" type="button" role="tab" aria-controls="nav-upcoming" aria-selected="true" 
                  style={this.state.tab === 'upcoming' ? Style.tabButtonSelected : Style.tabButton}  
                  onClick={() => this.clickTab("upcoming")}>
                  Upcoming (500+)
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  }

  // TODO: Implement language filter
  renderLanguageSelector() {
    return (
      <div className="col-4" style={{paddingLeft: 5, paddingRight: 0}}>
        <div className="dropdown">
          <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"
            style={{color: 'grey', backgroundColor: 'white', borderColor: '#ced4da', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', overflow: 'hidden'}}>
            Language
          </button>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">Action</a></li>
            <li><a className="dropdown-item" href="#">Another action</a></li>
            <li><a className="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </div>
      </div>
    )
  }

  renderSpaceList() {
    var spaceList = [];
    if (this.state.tab === 'past') {
      spaceList = this.state.pastSpaces;
    } else if (this.state.tab === 'live') {
      spaceList = this.state.spaces;
      const sponsoredSpaceList = spaceList.filter((space) => SPONSER_LIST.includes(space.creator_username));
      const otherSpaceList = spaceList.filter((space) => !SPONSER_LIST.includes(space.creator_username));
      spaceList = sponsoredSpaceList.concat(otherSpaceList);
    } else if (this.state.tab === "upcoming") {
      spaceList = this.state.upcomingSpaces;
      const sponsoredSpaceList = spaceList.filter((space) => SPONSER_LIST.includes(space.creator_username));
      const otherSpaceList = spaceList.filter((space) => !SPONSER_LIST.includes(space.creator_username));
      spaceList = sponsoredSpaceList.concat(otherSpaceList);
    }
    if (spaceList.length == 0) {
      return (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )
    }
    // search filter
    spaceList = spaceList.filter((space) => {
      return (
        (space.title && space.title.toLowerCase().includes(this.state.searchKeyword)) ||
        (space.creator_description && space.creator_description.toLowerCase().includes(this.state.searchKeyword)) ||
        (space.creator_name && space.creator_name.toLowerCase().includes(this.state.searchKeyword)) ||
        (space.creator_username && space.creator_username.toLowerCase().includes(this.state.searchKeyword))
      )
    });
    spaceList = spaceList.slice(0, this.state.pageSize);
    return (
      <div className="row">
        {spaceList.map((space) => this.renderSpaceCard(space, SPONSER_LIST.includes(space.creator_username)))}
      </div>
    )
  }

  renderSpaceCard(space, isSponsered) {
    return (
      <div key={space.id} className="card text-start position-relative" 
        style={{width: 568, backgroundColor: '#1DA1F2', borderRadius: 12, padding: 11, marginBottom: 5, borderColor: isSponsered ? '#FCBD34' : 'rgb(0 0 0 / 18%)'}}>
        { 
          isSponsered && 
            <div className="position-absolute top-0 end-0" style={{marginTop: 20, transform: 'rotate(45deg)', color: '#FCBD34'}}>
              Promoted
            </div>
        }
        <div className="row" style={{paddingLeft: 11, paddingRight: 11}}>
          <div className="col col-auto" style={{padding: 0, marginRight: 4}}>
            <div style={{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
              <img style={{height: 19, width: 19, borderRadius: '50%', border: '1px solid white', objectFit: 'contain'}} src={space.creator_profile_image_url}  alt="..."/>
            </div>
          </div>
          <div className="col col-auto" style={{padding: 0, color: 'white', fontSize: 13, maxWidth: '70%'}}>
            <div style={{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
              <span className="card-text align-middle" style={{overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{space.creator_name}</span>
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
          { this.state.tab === 'upcoming' ?
              <p className="card-text" style={{color: 'white', fontSize: 13}}>Starts: {this.renderSpaceStartDate(space.scheduled_start)}</p> :
              <p className="card-text" style={{color: 'white', fontSize: 13}}>{space.participant_count} in this space</p> 
          }
        </div>
        <div className="row" style={{paddingLeft: 12, paddingRight: 12}}>
          <div 
            style={{height: 32, marginTop: 15, backgroundColor: 'rgb(239, 243, 244)', minWidth: 34, borderRadius: '9999px', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', cursor: 'pointer'}}
            onClick={() => this.goToSpace(space.id)}> 
           <span style={{fontSize: 14, fontWeight: 700}}>{this.state.tab === 'live' ? 'Listen live' : 'Go to Space'}</span>
          </div>
        </div>
      </div>
    )
  }

  renderSpaceStartDate(startDate) {
    const spaceDate = new Date(startDate);
    return spaceDate.toLocaleString();
    // const now = new Date();
    // if (spaceDate.getDate() == now.getDate()) {
    //   const diffInSecs = spaceDate.getSeconds() - now.getSeconds;
    //   const diffInHours = Math.floor(diffInSecs / 3600);
    //   const diffInMins = Math.floor((diffInSecs - diffInHours * 3600) / 60);
    //   return `${diffInHours} h ${diffInMins} min`;
    // } else {
    //   return spaceDate.toLocaleDateString();
    // }
    
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

  searchSpace(event) {
    const searchKeyword = event.target.value;
    mixpanel.track("Search space", {
      keyword: searchKeyword
    })
    this.setState({searchKeyword: searchKeyword.toLowerCase()});
  }

  clickTab(tab) {
    mixpanel.track("Click " + tab + " tab");
    if (tab === "past") {
      if (this.state.pastSpaces.length == 0) {
        this.fetchPastSpaces();
      }
      this.setState({tab: tab});
    } else if (tab === "live") {
      this.setState({tab: tab});
    } else if (tab === "upcoming") {
      if (this.state.upcomingSpaces.length == 0) {
        this.fetchUpcomingSpaces();
      }
      this.setState({tab: tab});
    }
  }

  goToSpace(spaceId) {
    mixpanel.track("Click space", {
      'spaceId': spaceId
    });
    window.open('https://twitter.com/i/spaces/'+spaceId, '_blank');
  }

  showToast() {
    mixpanel.track("Click upcoming tab");
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

  fetchPastSpaces() {
    fetch('https://web3twitterspace-default-rtdb.firebaseio.com/past.json')
    .then(response => response.json())
    .then(data => {
      data = Object.values(data);
      data = data
        .filter((a) => a.participant_count > 0)
        .sort((a, b) => b.participant_count - a.participant_count);
      this.setState({pastSpaces: data});
    });
  }

  fetchUpcomingSpaces() {
    fetch('https://web3twitterspace-default-rtdb.firebaseio.com/upcoming.json')
    .then(response => response.json())
    .then(data => {
      data = Object.values(data);
      data = data
        .sort((a, b) => new Date(a.scheduled_start).getTime() - new Date(b.scheduled_start).getTime());
      this.setState({upcomingSpaces: data});
    });
  }
}

const Style = {
  tabButtonSelected: {
    color: 'white', fontSize: 'calc(14px + 0.2vw)', width: 'fit-content', padding: 5, border: '1px solid #1D9BF0', backgroundColor: '#1D9BF0'
  },
  tabButton: {
    color: '#1DA1F2', fontSize: 'calc(14px + 0.2vw)', width: 'fit-content', padding: 5, border: '1px solid #ced4da', backgroundColor: 'white'
  }
}

const SPONSER_LIST = [
  "Blue2black",
  "jpegcoffee",
  "therealmrcrypto"
]

let domContainer = document.querySelector('#react_container');
ReactDOM.render(<Main />, domContainer);