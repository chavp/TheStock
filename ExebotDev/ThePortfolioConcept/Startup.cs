using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(ThePortfolioConcept.Startup))]
namespace ThePortfolioConcept
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
