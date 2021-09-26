def process_parsers(reqparse):
    parser = reqparse.RequestParser()

    parser.add_argument("app", type=str, required=True)
    parser.add_argument("api_type", type=str, required=True)
    parser.add_argument("duration", type=int, required=True)
    parser.add_argument("status", type=str, required=True)
    parser.add_argument("started_at", type=str, required=True)
    parser.add_argument("username", type=str, required=True)
    parser.add_argument("version", type=str, required=True)

    return parser
