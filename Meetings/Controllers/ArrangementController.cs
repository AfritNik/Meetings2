using Microsoft.AspNetCore.Mvc;
using Meetings.Models;
using Meetings.Services;

namespace Meetings.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ArrangementController : ControllerBase
    {
        private readonly ArrangementService m_ArrangementService;

        public ArrangementController(ArrangementService mArrangementService)
        {
            m_ArrangementService = mArrangementService;
        }

        [HttpGet("[action]")]
        public IActionResult Search([FromQuery]string term = null)
        {
            return Json(m_ArrangementService.Search(term));
        }

        [HttpPost("[action]")]
        public IActionResult Add(Arrangement model)
        {
            if (model == null)
                return BadRequest($"{nameof(model)} is null.");
            var result = m_ArrangementService.Add(model);
            return Json(result);
        }

        [HttpPatch("{id:int}")]
        public IActionResult Update(Arrangement model)
        {
            if (model == null)
                return BadRequest($"{nameof(model)} is null.");
            var result = m_ArrangementService.Update(model);
            return Json(result);
        }

        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
            if (id <= 0)
                return BadRequest($"{nameof(id)} <= 0.");
            var result = m_ArrangementService.Delete(id);
            return Json(result);
        }
    }
}
