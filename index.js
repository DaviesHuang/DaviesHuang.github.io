'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Main = function (_React$Component) {
  _inherits(Main, _React$Component);

  function Main(props) {
    _classCallCheck(this, Main);

    var _this = _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).call(this, props));

    _this.state = {
      spaces: [],
      pastSpaces: [],
      tab: 'live',
      pageSize: 50,
      searchKeyword: ""
    };
    return _this;
  }

  _createClass(Main, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      window.addEventListener("scroll", function () {
        return _this2.handleScroll();
      });

      fetch('https://web3twitterspace-default-rtdb.firebaseio.com/live.json').then(function (response) {
        return response.json();
      }).then(function (data) {
        data = data.sort(function (a, b) {
          return b.participant_count - a.participant_count;
        });
        _this2.setState({ spaces: data });
        console.log(data);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'container text-center', style: { maxWidth: 598 } },
        React.createElement(
          'div',
          { className: 'row', style: { marginTop: 8 } },
          React.createElement(
            'h2',
            null,
            React.createElement('img', { style: { height: 28, width: 28, verticalAlign: 'initial' }, alt: '\uD83D\uDD25', draggable: 'false', src: 'https://abs-0.twimg.com/emoji/v2/svg/1f525.svg' }),
            React.createElement(
              'span',
              { style: { color: "white" } },
              ' Web3 Twitter Space'
            )
          )
        ),
        this.renderTabs(),
        React.createElement(
          'div',
          { className: 'row tab-content', id: 'nav-tabContent', style: { paddingLeft: 15, paddingRight: 15, paddingBottom: 15, minHeight: 600 } },
          React.createElement(
            'div',
            { className: 'tab-pane fade', id: 'nav-past', role: 'tabpanel', 'aria-labelledby': 'nav-past-tab', tabIndex: '0' },
            this.renderSpaceList()
          ),
          React.createElement(
            'div',
            { className: 'tab-pane fade show active', id: 'nav-live', role: 'tabpanel', 'aria-labelledby': 'nav-live-tab', tabIndex: '0' },
            this.renderSpaceList()
          ),
          React.createElement(
            'div',
            { className: 'tab-pane fade', id: 'nav-upcoming', role: 'tabpanel', 'aria-labelledby': 'nav-upcoming-tab', tabIndex: '0' },
            '...'
          )
        ),
        this.renderFooter(),
        this.renderToast()
      );
    }
  }, {
    key: 'renderTabs',
    value: function renderTabs() {
      var _this3 = this;

      return React.createElement(
        'nav',
        null,
        React.createElement(
          'div',
          { className: 'row', id: 'nav-tab', role: 'tablist', style: { paddingLeft: 15, paddingRight: 15 } },
          React.createElement(
            'div',
            null,
            React.createElement(
              'div',
              { className: 'row justify-content-start' },
              React.createElement(
                'div',
                { className: 'col-12', style: { paddingLeft: 0, paddingRight: 0 } },
                React.createElement('input', { className: 'form-control me-2', type: 'search', placeholder: 'Search spaces', 'aria-label': 'Search',
                  onFocus: function onFocus() {
                    return mixpanel.track("Click search bar");
                  },
                  onChange: function onChange(e) {
                    return _this3.searchSpace(e);
                  } })
              ),
              React.createElement(
                'div',
                { className: 'col-auto', style: { padding: 0, marginTop: 5, marginRight: 10, marginBottom: 5 } },
                React.createElement(
                  'button',
                  { className: 'btn', id: 'nav-past-tab', 'data-bs-toggle': 'tab', 'data-bs-target': '#nav-past', type: 'button', role: 'tab', 'aria-controls': 'nav-past', 'aria-selected': 'false',
                    style: this.state.tab === 'past' ? Style.tabButtonSelected : Style.tabButton,
                    onClick: function onClick() {
                      return _this3.clickTab("past");
                    } },
                  'Past (6000+)'
                )
              ),
              React.createElement(
                'div',
                { className: 'col-auto', style: { padding: 0, marginTop: 5, marginRight: 10, marginBottom: 5 } },
                React.createElement(
                  'button',
                  { className: 'btn col-4 active', id: 'nav-live-tab', 'data-bs-toggle': 'tab', 'data-bs-target': '#nav-live', type: 'button', role: 'tab', 'aria-controls': 'nav-live', 'aria-selected': 'true',
                    style: this.state.tab === 'live' ? Style.tabButtonSelected : Style.tabButton,
                    onClick: function onClick() {
                      return _this3.clickTab("live");
                    } },
                  'Live (' + this.state.spaces.length + ')'
                )
              ),
              React.createElement(
                'div',
                { className: 'col-auto', style: { padding: 0, marginTop: 5, marginRight: 10, marginBottom: 5 } },
                React.createElement(
                  'button',
                  { className: 'btn col-4', id: 'nav-upcoming-tab',
                    style: this.state.tab === 'upcoming' ? Style.tabButtonSelected : Style.tabButton,
                    onClick: function onClick() {
                      return _this3.clickTab("upcoming");
                    } },
                  'Upcoming'
                )
              )
            )
          )
        )
      );
    }

    // TODO: Implement language filter

  }, {
    key: 'renderLanguageSelector',
    value: function renderLanguageSelector() {
      return React.createElement(
        'div',
        { className: 'col-4', style: { paddingLeft: 5, paddingRight: 0 } },
        React.createElement(
          'div',
          { className: 'dropdown' },
          React.createElement(
            'button',
            { className: 'btn btn-secondary dropdown-toggle', type: 'button', 'data-bs-toggle': 'dropdown', 'aria-expanded': 'false',
              style: { color: 'grey', backgroundColor: 'white', borderColor: '#ced4da', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', overflow: 'hidden' } },
            'Language'
          ),
          React.createElement(
            'ul',
            { className: 'dropdown-menu' },
            React.createElement(
              'li',
              null,
              React.createElement(
                'a',
                { className: 'dropdown-item', href: '#' },
                'Action'
              )
            ),
            React.createElement(
              'li',
              null,
              React.createElement(
                'a',
                { className: 'dropdown-item', href: '#' },
                'Another action'
              )
            ),
            React.createElement(
              'li',
              null,
              React.createElement(
                'a',
                { className: 'dropdown-item', href: '#' },
                'Something else here'
              )
            )
          )
        )
      );
    }
  }, {
    key: 'renderSpaceList',
    value: function renderSpaceList() {
      var _this4 = this;

      var spaceList = [];
      var isLive = false;
      if (this.state.tab === 'past') {
        spaceList = this.state.pastSpaces;
        isLive = false;
      } else {
        spaceList = this.state.spaces;
        var sponsoredSpaceList = spaceList.filter(function (space) {
          return SPONSER_LIST.includes(space.creator_username);
        });
        var otherSpaceList = spaceList.filter(function (space) {
          return !SPONSER_LIST.includes(space.creator_username);
        });
        spaceList = sponsoredSpaceList.concat(otherSpaceList);
        isLive = true;
      }
      if (spaceList.length == 0) {
        return React.createElement(
          'div',
          { className: 'spinner-border', role: 'status' },
          React.createElement(
            'span',
            { className: 'visually-hidden' },
            'Loading...'
          )
        );
      }
      // search filter
      spaceList = spaceList.filter(function (space) {
        return space.title && space.title.toLowerCase().includes(_this4.state.searchKeyword) || space.creator_description && space.creator_description.toLowerCase().includes(_this4.state.searchKeyword) || space.creator_name && space.creator_name.toLowerCase().includes(_this4.state.searchKeyword) || space.creator_username && space.creator_username.toLowerCase().includes(_this4.state.searchKeyword);
      });
      spaceList = spaceList.slice(0, this.state.pageSize);
      return React.createElement(
        'div',
        { className: 'row' },
        spaceList.map(function (space) {
          return _this4.renderSpaceCard(space, isLive, SPONSER_LIST.includes(space.creator_username));
        })
      );
    }
  }, {
    key: 'renderSpaceCard',
    value: function renderSpaceCard(space, isLive, isSponsered) {
      var _this5 = this;

      return React.createElement(
        'div',
        { key: space.id, className: 'card text-start position-relative',
          style: { width: 568, backgroundColor: '#1DA1F2', borderRadius: 12, padding: 11, marginBottom: 5, borderColor: isSponsered ? '#FCBD34' : 'rgb(0 0 0 / 18%)' } },
        isSponsered && React.createElement(
          'div',
          { className: 'position-absolute top-0 end-0', style: { marginTop: 20, transform: 'rotate(45deg)', color: '#FCBD34' } },
          'Promoted'
        ),
        React.createElement(
          'div',
          { className: 'row', style: { paddingLeft: 11, paddingRight: 11 } },
          React.createElement(
            'div',
            { className: 'col col-auto', style: { padding: 0, marginRight: 4 } },
            React.createElement(
              'div',
              { style: { height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' } },
              React.createElement('img', { style: { height: 19, width: 19, borderRadius: '50%', border: '1px solid white', objectFit: 'contain' }, src: space.creator_profile_image_url, alt: '...' })
            )
          ),
          React.createElement(
            'div',
            { className: 'col col-auto', style: { padding: 0, color: 'white', fontSize: 13, maxWidth: '70%' } },
            React.createElement(
              'div',
              { style: { height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' } },
              React.createElement(
                'span',
                { className: 'card-text align-middle', style: { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } },
                space.creator_name
              )
            )
          ),
          React.createElement(
            'div',
            { className: 'col col-auto', style: { color: 'white', marginLeft: 8, padding: 0 } },
            React.createElement(
              'div',
              { style: { height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' } },
              React.createElement(
                'span',
                { className: 'align-middle', style: { paddingLeft: 4, paddingRight: 4, borderRadius: 4, backgroundColor: 'rgba(255, 255, 255, 0.3)', fontSize: 12, fontWeight: 400 } },
                'Host'
              )
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'row', style: { marginTop: 8, marginBottom: 8 } },
          React.createElement(
            'span',
            { style: { fontSize: 19, fontWeight: 800, color: 'white' } },
            space.title
          )
        ),
        React.createElement(
          'div',
          { className: 'row' },
          React.createElement(
            'p',
            { className: 'card-text', style: { color: 'white', fontSize: 13 } },
            space.participant_count,
            ' in this space'
          )
        ),
        React.createElement(
          'div',
          { className: 'row', style: { paddingLeft: 12, paddingRight: 12 } },
          React.createElement(
            'div',
            {
              style: { height: 32, marginTop: 15, backgroundColor: 'rgb(239, 243, 244)', minWidth: 34, borderRadius: '9999px', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', cursor: 'pointer' },
              onClick: function onClick() {
                return _this5.goToSpace(space.id);
              } },
            React.createElement(
              'span',
              { style: { fontSize: 14, fontWeight: 700 } },
              isLive ? 'Listen live' : 'Go to Space'
            )
          )
        )
      );
    }
  }, {
    key: 'renderFooter',
    value: function renderFooter() {
      return React.createElement(
        'div',
        { className: 'row row-cols-auto', style: { color: 'white', paddingLeft: 15, paddingRight: 15, marginBottom: 15 } },
        React.createElement(
          'div',
          { className: 'col', onClick: function onClick() {
              return window.open('https://www.privacypolicygenerator.info/live.php?token=4fclxBeWggIPSSnIp0flCgPXY0nQGdcu', '_blank');
            } },
          'Privacy Policy'
        ),
        React.createElement(
          'div',
          { className: 'col', onClick: function onClick() {
              return window.open('https://www.termsandconditionsgenerator.com/live.php?token=kWY9pYLJmCUPGMXxH5S2elpC35R4c1bU', '_blank');
            } },
          'Terms and Conditions'
        ),
        React.createElement(
          'div',
          { className: 'col' },
          '@ 2022 twitterspace.co; All rights reserved'
        )
      );
    }
  }, {
    key: 'renderToast',
    value: function renderToast() {
      return React.createElement(
        'div',
        { className: 'toast-container position-fixed bottom-0 end-0 p-3' },
        React.createElement(
          'div',
          { id: 'liveToast', className: 'toast', role: 'alert align-items-center', 'aria-live': 'assertive', 'aria-atomic': 'true' },
          React.createElement(
            'div',
            { className: 'd-flex' },
            React.createElement(
              'div',
              { className: 'toast-body' },
              'This feature will be coming soon!'
            ),
            React.createElement('button', { type: 'button', className: 'btn-close me-2 m-auto', 'data-bs-dismiss': 'toast', 'aria-label': 'Close' })
          )
        )
      );
    }
  }, {
    key: 'searchSpace',
    value: function searchSpace(event) {
      var searchKeyword = event.target.value;
      mixpanel.track("Search space", {
        keyword: searchKeyword
      });
      this.setState({ searchKeyword: searchKeyword.toLowerCase() });
    }
  }, {
    key: 'clickTab',
    value: function clickTab(tab) {
      mixpanel.track("Click " + tab + " tab");
      if (tab === "past") {
        if (this.state.pastSpaces.length == 0) {
          this.fetchPastSpaces();
        }
        this.setState({ tab: tab });
      } else if (tab === "live") {
        this.setState({ tab: tab });
      } else {
        this.showToast();
      }
    }
  }, {
    key: 'goToSpace',
    value: function goToSpace(spaceId) {
      mixpanel.track("Click space", {
        'spaceId': spaceId
      });
      window.open('https://twitter.com/i/spaces/' + spaceId, '_blank');
    }
  }, {
    key: 'showToast',
    value: function showToast() {
      mixpanel.track("Click upcoming tab");
      var toastLiveExample = document.getElementById('liveToast');
      var toast = new bootstrap.Toast(toastLiveExample);
      toast.show();
    }
  }, {
    key: 'handleScroll',
    value: function handleScroll() {
      var userScrollHeight = window.innerHeight + window.scrollY;
      var windowBottomHeight = document.documentElement.offsetHeight;

      if (userScrollHeight >= windowBottomHeight) {
        this.setState(function (prevState, props) {
          return { pageSize: prevState.pageSize + 50 };
        });
      }
    }
  }, {
    key: 'fetchPastSpaces',
    value: function fetchPastSpaces() {
      var _this6 = this;

      fetch('https://web3twitterspace-default-rtdb.firebaseio.com/past.json').then(function (response) {
        return response.json();
      }).then(function (data) {
        data = Object.values(data);
        data = data.filter(function (a) {
          return a.participant_count > 0;
        }).sort(function (a, b) {
          return b.participant_count - a.participant_count;
        });
        _this6.setState({ pastSpaces: data });
      });
    }
  }]);

  return Main;
}(React.Component);

var Style = {
  tabButtonSelected: {
    color: 'white', fontSize: 'calc(14px + 0.2vw)', width: 'fit-content', padding: 5, border: '1px solid #1D9BF0', backgroundColor: '#1D9BF0'
  },
  tabButton: {
    color: '#1DA1F2', fontSize: 'calc(14px + 0.2vw)', width: 'fit-content', padding: 5, border: '1px solid #ced4da', backgroundColor: 'white'
  }
};

var SPONSER_LIST = ["Blue2black", "jpegcoffee", "therealmrcrypto"];

var domContainer = document.querySelector('#react_container');
ReactDOM.render(React.createElement(Main, null), domContainer);