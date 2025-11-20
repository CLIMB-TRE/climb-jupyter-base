import json
from importlib.metadata import version
from jupyter_server.base.handlers import APIHandler
from jupyter_server.utils import url_path_join
import tornado
from .decorators import handle_api_errors


PLUGIN_NAME = "climb-jupyter-base"


class VersionHandler(APIHandler):
    """
    Handler to return the version of the climb-jupyter-base package.
    """

    @tornado.web.authenticated
    @handle_api_errors
    def get(self):
        self.finish(json.dumps({"version": version(PLUGIN_NAME)}))


def setup_route_handlers(web_app):
    host_pattern = ".*$"
    base_url = web_app.settings["base_url"]

    route_pattern = url_path_join(base_url, PLUGIN_NAME, "version")
    handlers = [(route_pattern, VersionHandler)]

    web_app.add_handlers(host_pattern, handlers)
