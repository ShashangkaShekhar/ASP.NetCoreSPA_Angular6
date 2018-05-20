using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SPACoreAngular.Web.serverapp.models;
using Microsoft.EntityFrameworkCore;

namespace SPACoreAngular.Web.serverapp.webapi
{
    [Route("api/Values"), Produces("application/json"), EnableCors("AppPolicy")]
    public class ValuesController : Controller
    {
        private dbCoreContext _ctx = null;
        public ValuesController(dbCoreContext context)
        {
            _ctx = context;
        }


        // GET: api/Values/GetUser
        [HttpGet, Route("GetUser")]
        public async Task<object> GetUser()
        {
            List<User> users = null;
            object result = null;
            try
            {
                using (_ctx)
                {
                    users = await _ctx.User.ToListAsync();
                    result = new
                    {
                        User
                    };
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return users;
        }

        // GET api/Values/GetByID/5
        [HttpGet, Route("GetByID/{id}")]
        public async Task<User> GetByID(int id)
        {
            User user = null;
            try
            {
                using (_ctx)
                {
                    user = await _ctx.User.FirstOrDefaultAsync(x => x.Id == id);
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return user;
        }


        // POST api/Values/Save
        [HttpPost, Route("Save")]
        public async Task<object> Save([FromBody]vmUser model)
        {
            object result = null; string message = "";
            if (model == null)
            {
                return BadRequest();
            }
            using (_ctx)
            {
                using (var _ctxTransaction = _ctx.Database.BeginTransaction())
                {
                    try
                    {
                        if (model.id > 0)
                        {
                            var entityUpdate = _ctx.User.FirstOrDefault(x => x.Id == model.id);
                            if (entityUpdate != null)
                            {
                                entityUpdate.FirstName = model.firstName;
                                entityUpdate.LastName = model.lastName;
                                entityUpdate.Phone = model.phone;
                                entityUpdate.Email = model.email;
                                await _ctx.SaveChangesAsync();
                            }
                        }
                        else
                        {
                            var UserModel = new User
                            {
                                FirstName = model.firstName,
                                LastName = model.lastName,
                                Email = model.email,
                                Phone = model.phone
                            };

                            _ctx.User.Add(UserModel);
                            await _ctx.SaveChangesAsync();
                        }

                        _ctxTransaction.Commit();
                        message = "Saved Successfully";
                    }
                    catch (Exception e)
                    {
                        _ctxTransaction.Rollback();
                        e.ToString();
                        message = "Saved Error";
                    }

                    result = new
                    {
                        message
                    };
                }
            }
            return result;
        }

        // DELETE api/Values/DeleteByID/5
        [HttpDelete, Route("DeleteByID/{id}")]
        public async Task<object> DeleteByID(int id)
        {
            object result = null; string message = "";
            using (_ctx)
            {
                using (var _ctxTransaction = _ctx.Database.BeginTransaction())
                {
                    try
                    {
                        var idToRemove = _ctx.User.SingleOrDefault(x => x.Id == id);
                        if (idToRemove != null)
                        {
                            _ctx.User.Remove(idToRemove);
                            await _ctx.SaveChangesAsync();
                        }
                        _ctxTransaction.Commit();
                        message = "Deleted Successfully";
                    }
                    catch (Exception e)
                    {
                        _ctxTransaction.Rollback(); e.ToString();
                        message = "Error on Deleting!!";
                    }

                    result = new
                    {
                        message
                    };
                }
            }
            return result;
        }
    }
}