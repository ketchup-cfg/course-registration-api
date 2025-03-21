namespace CourseRegistration.Api.Exceptions;

public class CourseDoesNotExistException : Exception
{
    public CourseDoesNotExistException()
        : base("The specified course does not exist")
    {

    }

    public CourseDoesNotExistException(string exceptionMessage)
        : base(exceptionMessage)
    {

    }

    public CourseDoesNotExistException(string exceptionMessage, Exception innerException)
        : base(exceptionMessage, innerException)
    {

    }
}