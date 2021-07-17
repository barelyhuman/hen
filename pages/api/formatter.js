import prettier from "prettier";

const handler = async (req, res) => {
  const toFormatCode = req.body.code;
  const _value = prettier.format(toFormatCode, {
    parser: "babel",
  });
  return res.json({
    code: _value,
  });
};

export default handler;
