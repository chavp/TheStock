using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(ExebotDev.Startup))]
namespace ExebotDev
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
