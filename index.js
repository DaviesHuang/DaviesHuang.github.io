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
      spaces: []
    };
    return _this;
  }

  _createClass(Main, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

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
      var _this3 = this;

      if (this.state.liked) {
        return 'You liked this.';
      }

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
        React.createElement(
          'div',
          { className: 'row' },
          React.createElement(
            'div',
            { className: 'col', style: { cursor: 'pointer' }, onClick: function onClick() {
                return _this3.showToast();
              } },
            React.createElement(
              'h4',
              null,
              'Past'
            )
          ),
          React.createElement(
            'div',
            { className: 'col' },
            React.createElement(
              'h4',
              { style: { textDecoration: 'underline' } },
              'Live'
            )
          ),
          React.createElement(
            'div',
            { className: 'col', style: { cursor: 'pointer' }, onClick: function onClick() {
                return _this3.showToast();
              } },
            React.createElement(
              'h4',
              null,
              'Upcoming'
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'row', style: { paddingLeft: 15, paddingRight: 15, paddingBottom: 15 } },
          this.state.spaces.map(function (space) {
            return _this3.renderSpaceCard(space);
          })
        ),
        this.renderToast()
      );
    }
  }, {
    key: 'renderSpaceCard',
    value: function renderSpaceCard(space) {
      var _this4 = this;

      return React.createElement(
        'div',
        { key: space.id, className: 'card text-start', style: { width: 568, backgroundColor: '#1D9BF0', borderRadius: 12, padding: 11, marginBottom: 5 } },
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
            { className: 'col col-auto', style: { padding: 0, color: 'white', fontSize: 13 } },
            React.createElement(
              'div',
              { style: { height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' } },
              React.createElement(
                'span',
                { className: 'card-text align-middle' },
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
                return _this4.goToSpace(space.id);
              } },
            React.createElement(
              'span',
              { style: { fontSize: 14, fontWeight: 700 } },
              'Go to Space'
            )
          )
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
    key: 'goToSpace',
    value: function goToSpace(spaceId) {
      window.open('https://twitter.com/i/spaces/' + spaceId, '_blank');
    }
  }, {
    key: 'showToast',
    value: function showToast() {
      var toastLiveExample = document.getElementById('liveToast');
      var toast = new bootstrap.Toast(toastLiveExample);
      toast.show();
    }
  }]);

  return Main;
}(React.Component);

var domContainer = document.querySelector('#react_container');
ReactDOM.render(React.createElement(Main, null), domContainer);