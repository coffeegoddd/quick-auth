const cookieParser = (str) => {
  const cookieMap = {};
  const rawDough = str.split('; ');
  for (let i = 0; i < rawDough.length; i += 1) {
    const tuple = rawDough[i].split('=');
    cookieMap[tuple[0]] = tuple[1];
  }
  return cookieMap.coffee;
};

module.exports = (req, res, next) => {
  const cookie = cookieParser(req.headers.cookie);
  if (!cookie) {
    res.cookie('coffee', 'w3lc0m3', { maxAge: 180000 });
    next();
  } else {
    next();
  }
};