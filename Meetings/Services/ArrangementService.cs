using System;
using System.Collections.Generic;
using System.Linq;
using Meetings.Infrastructure;
using Meetings.Models;

namespace Meetings.Services
{
    public class ArrangementService : ServiceBase
    {
        protected static List<Arrangement> ArrangementList { get; }

        static ArrangementService()
        {
            User user = new User() {ID = 0, Name = "Nik", LastName = "Belov", Login = "admin", Password = "admin"};
            ArrangementList = new List<Arrangement>
            {
                new Arrangement(1, "Christmas", new DateTime(2020,1,1,0,0,0,0), user),
                new Arrangement(2, "Nik's Birthday", new DateTime(2019,12,9,0,0,0,0), user),
                new Arrangement(3, "Volga", new DateTime(2019,08,12,0,0,0,0), user)
            };
        }

        public virtual Result<List<Arrangement>> Search(string term = null)
        {
            if (!string.IsNullOrEmpty(term))
            {
                term = term.ToLower();
                term = term.Trim();

                var result =
                    ArrangementList
                    .Where(x =>
                        x.Caption.ToLower().Contains(term) ||
                        x.Description.ToLower().Contains(term)
                    )
                    .ToList();

                return Ok(result);
            }

            return Ok(ArrangementList);
        }

        public virtual Result<int> Add(Arrangement model)
        {
            if (model == null)
                return Error<int>();
            if (string.IsNullOrEmpty(model.Caption))
                return Error<int>("Caption not defined.");
            if (model.Time<DateTime.Now)
                return Error<int>("Arrangement from past couldn't be added");

            TrimStrings(model);

            if (isArrangementExist(model))
            {
                return Error<int>("Arrangement with the same caption already exists.");
            }

            var newId = ArrangementList.Max(x => x?.Id ?? 0) + 1;
            model.Id = newId;

            ArrangementList.Add(model);

            return Ok(model.Id);
        }

        public virtual Result Update(Arrangement model)
        {
            if (model == null)
                return Error();
            if (model.Id <= 0)
                return Error($"{model.Id} <= 0.");
            var Arrangement = ArrangementList.FirstOrDefault(x => x.Id == model.Id);
            if (Arrangement == null)
                return Error($"Arrangement with id = {model.Id} not found.");

            TrimStrings(model);

            var ArrangementExists =ArrangementList.Any(x =>x.Id != model.Id && x.Caption == model.Caption);
            if (ArrangementExists)
            {
                return Error("Arrangement with the same caption already exists.");
            }

            Arrangement.Caption = model.Caption;

            return Ok();
        }

        public virtual Result Delete(int id)
        {
            var unit = ArrangementList.FirstOrDefault(x => x.Id == id);
            if (unit == null)
                return Error($"Can't find Arrangement with Id = {id}.");
            ArrangementList.Remove(unit);
            return Ok();
        }

        private static void TrimStrings(Arrangement model)
        {
            model.Caption = model.Caption.Trim();
        }

        private bool isArrangementExist(Arrangement newArrangement)
        {
            return ArrangementList.Any(x => x.Caption == newArrangement.Caption);
        }
    }
}
