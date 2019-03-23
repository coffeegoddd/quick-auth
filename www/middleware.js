const cookieParser = (str) => {
  const cookieMap = {};
  const rawDough = str.split('; ');
  for (let i = 0; i < rawDough.length; i += 1) {
    const tuple = rawDough[i].split('=');
    cookieMap[tuple[0]] = tuple[1];
  }
  return cookieMap.coffee;
};

const getOrSetCookie = (req, res, next) => {
  if (!req.headers.cookie) {
    res.cookie('coffee', 'w3lc0m3', { maxAge: 180000 });
    next();
  } else {
    const cookie = cookieParser(req.headers.cookie);
    if (!cookie) res.cookie('coffee', 'w3lc0m3', { maxAge: 180000 });
    next();
  }
};


module.exports = { cookieParser, getOrSetCookie }