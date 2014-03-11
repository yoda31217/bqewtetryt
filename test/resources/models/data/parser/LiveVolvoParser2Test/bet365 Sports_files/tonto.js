var EnumEventsOrPageTypes = {Click: 0, PageLoad: 1, Pupup: 2, Refresh: 3, Home: 4, Authentication: 5, Preferences: 6}, EnumPodID = {Betslip: 1, InPlayLauncherModule: 2, CouponHighlights: 3, TopLauncher: 25, HighlightsPod: 11, NextRaces: 19, FinancialsPod: 7, InPlay: 8, Financials: 9, FinancialsApplication: 5, WebsiteHeader: 10, GamesPod: 9, HorseSearch: 12, ImagePod: 13, Footer: 8, InPlayDiary: 15, FinancialsBetslip: 6, Lotto: 17, MediaPlayer: 18, Coupon: 4, ParlayTeaser: 20, PodLoader: 21, Splash: 22, ToolsMenu: 23, TopCouponPod: 24, CenterPod: 2, UpcomingInPlay: 26, WebsiteNavigation: 27}, EnumProductID = {None: 0, Sports: 1, Casino: 3, Poker: 4, Games: 5, Bingo: 7, InPlay: 8, Financials: 9, Extra: 10, Help: 11, OpenAccount: 12, Members: 13}, EnumRegionID = {Header: 1, Left: 2, Center: 3, Right: 4, Footer: 5}, EnumFieldID = {Go: 18, Logout: 23, ShowBalance: 24, RefreshBalance: 25, Language: 15, Odds: 16, Services: 17, SiteVersion: 11, SVPremium: 13, Financials: 5};
b365.Ui.Tonto = function () {
  this._ajaxReqID;
  this._browserName;
  this._browserVersion;
  this._browserWindowSize;
  this._flashVersion;
  this._screenColourDepth;
  this._screenResolution;
  this._operatingSys;
  this._referrer;
  this._request;
  this._eventTypeID;
  this._sessionID;
  this._productID;
  this._customMetaData;
  this._eventID;
  this._siteID;
  this._productID;
  this._tarProductID;
  this._classificationID;
  this._languageID;
  this._zoneID;
  this._clickPositionX;
  this._clickPositionY;
  this._podID;
  this._podSpecificData;
  this._pageSectionColumn;
  this._pageSectionVertical;
  this._pageType;
  this._pageRef;
  this._fieldID;
  this._regionID
};
b365.Ui.Tonto.prototype = {pageLoad: function () {
  try {
    if (etrk != "undefined" && etrk) {
      this._siteID = 2;
      this._browserName = Sys.Browser.name;
      this._browserWindowSize = screen.width + "x" + screen.height;
      this._browserVersion = Sys.Browser.version;
      this._screenColourDepth = window.screen.colorDepth;
      this._screenResolution = window.screen.width + "x" + window.screen.height;
      this._operatingSys = this.getOSNameVersion();
      this._pageType = EnumEventsOrPageTypes.Click;
      this._eventID = EnumEventsOrPageTypes.Click;
      this._productID = EnumProductID.Sports
    }
  }
  catch (a) {
  }
}, send: function (b, h, f, d, a, e, c) {
  try {
    if (typeof etrk != "undefined" && etrk) {
      this._trkURL = "/tonto001/tonto.ashx?";
      this._regionID = h;
      this._request = window.location.href;
      this._referrer = document.referrer;
      this._languageID = $bSys.getValueFromCookie("aps03", "lng", 1);
      this._zoneID = $bSys.getValueFromCookie("aps03", "tzi", 1);
      this._sessionID = $bSys.getValueFromCookie("pstk", "");
      this._clickPositionX = 0;
      this._clickPositionY = 0;
      if (b && b.rawEvent) {
        this._clickPositionX = $bSys.mouseX(b.rawEvent);
        this._clickPositionY = $bSys.mouseY(b.rawEvent)
      }
      if (window.location.hash !== "")this._pageRef = encodeURIComponent("sports/" + window.location.hash.replace(/(#|!|\/)/g, "") + (a === EnumPodID.Coupon
        ? " Coupon"
        : a === EnumPodID.Splash
        ? " Splash"
        : ""));
      if (typeof d !== "undefined" && d > -1) {
        this._eventID = d;
        this._pageType = d
      }
      this._tarProductID = typeof this._tarProductID !== "undefined" && this._tarProductID > -1
        ? this._tarProductID
        : this._productID;
      if (typeof a !== "undefined" && a > 0)this._podID = a;
      if (typeof c !== "undefined" && c !== null && c > 0)this._podSpecificData = encodeURIComponent(c);
      if (f > -1)this._classificationID = f;
      if (typeof e !== "undefined" && e > 0)this._fieldID = e;
      this._trkURL = window.location.protocol + "//" + window.location.hostname + this._trkURL + this.getQueryString();
      var g = new b365AJAX(this._trkURL, null, null, 3e4, null, false, 0, arguments);
      g.Load("HEAD")
    }
  }
  catch (i) {
  }
}, getProductFieldID: function (a) {
  this._fieldID = a == 1
    ? EnumProductID.Sports
    : a == 3
    ? EnumProductID.Casino
    : a == 4
    ? EnumProductID.Poker
    : a == 5
    ? EnumProductID.Games
    : a == 7
    ? EnumProductID.Bingo
    : 0;
  this._tarProductID = a
}, getTAPIFieldID: function (c) {
  var b = -1;
  try {
    for (var a = 0; a < this.TAPIFieldIDMapper.length; a++)if (Number(c) == this.TAPIFieldIDMapper[a].TID)b = this.TAPIFieldIDMapper[a].FID
  }
  catch (d) {
  }
  return b
}, getQueryString: function () {
  var a = "st=" + this._sessionID;
  a += "&lg=" + this._languageID;
  a += "&zn=" + this._zoneID;
  a += "&pd=" + this._productID;
  a += "&tp=" + this._tarProductID;
  if (typeof this._regionID !== "undefined") {
    var b = 1, c = 1;
    switch (this._regionID) {
      case 1:
        c = 0;
        break;
      case 2:
        b = 0;
        break;
      case 4:
        b = 99;
        break;
      case 5:
        c = 99
    }
    a += "&cn=" + b + "&vp=" + c
  }
  if (typeof this._screenResolution !== "undefined")a += "&sr=" + this._screenResolution;
  if (typeof this._browserWindowSize !== "undefined")a += "&ws=" + this._browserWindowSize;
  if (typeof this._pageType !== "undefined")a += "&pt=" + this._pageType;
  if (typeof this._fieldID !== "undefined")a += "&fi=" + this._fieldID;
  if (typeof this._eventID !== "undefined")a += "&ei=" + this._eventID;
  if (typeof this._classificationID !== "undefined")a += "&ci=" + this._classificationID;
  if (typeof this._podID !== "undefined")a += "&pi=" + this._podID;
  if (typeof this._podSpecificData !== "undefined")a += "&ps=" + encodeURI(this._podSpecificData);
  if (typeof this._podSpecificData !== "undefined")a += "&md=" + encodeURI(this._podSpecificData);
  if (typeof this._browserName !== "undefined")a += "&br=" + encodeURIComponent(this._browserName);
  if (typeof this._browserVersion !== "undefined")a += "&bv=" + encodeURIComponent(this._browserVersion);
  if (typeof this._flashVersion !== "undefined")a += "&fv=" + encodeURIComponent(this._flashVersion);
  if (typeof this._screenColourDepth !== "undefined")a += "&sc=" + this._screenColourDepth;
  if (typeof this._operatingSys !== "undefined")a += "&os=" + encodeURIComponent(this._operatingSys);
  if (typeof this._clickPositionX !== "undefined")a += "&xc=" + this._clickPositionX;
  if (typeof this._clickPositionY !== "undefined")a += "&yc=" + this._clickPositionY;
  a += "&si=" + this._siteID;
  a += "&cf=" + $bSys.getValueFromCookie("aps03", "cf", "N");
  a += "&hd=" + $bSys.getValueFromCookie("aps03", "hd", "N");
  if (typeof this._pageRef !== "undefined")a += "&pf=" + this._pageRef;
  return a
}, TAPIFieldIDMapper: [
  {TID: 1, FID: 29},
  {TID: 2, FID: 30},
  {TID: 3, FID: 31},
  {TID: 4, FID: 32},
  {TID: 5, FID: 42},
  {TID: 6, FID: 42},
  {TID: 8, FID: 35},
  {TID: 9, FID: 36},
  {TID: 10, FID: 10},
  {TID: 15, FID: 37},
  {TID: 16, FID: 39},
  {TID: 17, FID: 40},
  {TID: 18, FID: 41},
  {TID: 19, FID: 33},
  {TID: 20, FID: 19},
  {TID: 21, FID: 20},
  {TID: 22, FID: 35},
  {TID: 26, FID: 10},
  {TID: 35, FID: 14},
  {TID: 36, FID: 40},
  {TID: 38, FID: 6},
  {TID: 39, FID: 7}
], getOSNameVersion: function () {
  var b = "Unknown OS", a = navigator.appVersion;
  if (Sys.Browser.agent !== Sys.Browser.InternetExplorer)a = navigator.userAgent;
  if (a.indexOf("Win") != -1) {
    if (a.indexOf("Windows NT 5.1") != -1 || a.indexOf("Windows XP") != -1)b = "Win XP";
    else if (a.indexOf("Windows NT 7.0") != -1 || a.indexOf("Windows NT 6.1") != -1)b = "Win 7";
    else if (a.indexOf("Windows NT 6.0") != -1)b = "Win Vista/Server 08";
    else if (a.indexOf("Windows ME") != -1)b = "Win ME";
    else if (a.indexOf("Windows NT 4.0") != -1 || a.indexOf("WinNT4.0") != -1 || a.indexOf("WinNT") != -1)b = "Win NT";
    else if (a.indexOf("Windows NT 5.2") != -1)b = "Win Server 03";
    else if (a.indexOf("Windows NT 5.0") != -1 || a.indexOf("Windows 2000") != -1)b = "Win 2000";
    else if (a.indexOf("Windows 98") != -1 || a.indexOf("Win98") != -1)b = "Win 98";
    else if (a.indexOf("Windows 95") != -1 || a.indexOf("Win95") != -1 || a.indexOf("Windows_95") != -1)b = "Win 95";
    else if (a.indexOf("Win16") != -1)b = "Win 3.1";
    else b = "Win Ver. Unknown";
    if (a.indexOf("WOW64") != -1 || a.indexOf("x64") != -1 || a.indexOf("Win64") != -1 || a.indexOf("IA64") != -1)b = b + "(x64)";
    else b = b + "(x32)"
  }
  else if (a.indexOf("Mac") != -1)b = "MacOS";
  else if (a.indexOf("X11") != -1)b = "UNIX";
  else if (a.indexOf("Linux") != -1)b = "Linux";
  return b
}};
trk = new b365.Ui.Tonto;
Sys.Application.add_load(Function.createDelegate(trk, trk.pageLoad))